import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from './models/product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from '../review/models/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  public async createProduct(dto: CreateProductDto) {
    return await this.productModel.create(dto);
  }

  public async findProductById(id: string) {
    return await this.productModel.findById(id).exec();
  }

  public async deleteProductById(id: string) {
    return await this.productModel.findByIdAndDelete(id).exec();
  }

  public async updateProductById(id: string, dto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  public async findWithReviews(dto: FindProductDto) {
    return (await this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'ReviewModel',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewsCount: { $size: '$reviews' },
            reviewsAvg: { $avg: '$reviews.rating' },
            reviews: {
              $function: {
                body: `function(reviews) {
                  reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                  return reviews;
                }`,
                args: ['$reviews'],
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec()) as (ProductModel & {
      reviews: ReviewModel[];
      reviewsCount: number;
      reviewsAvg: number;
    })[];
  }
}
