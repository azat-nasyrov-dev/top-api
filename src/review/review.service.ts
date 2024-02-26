import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, ReviewModel } from './models/review.model';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  public async createProduct(dto: CreateReviewDto): Promise<ReviewModel> {
    return await this.reviewModel.create(dto);
  }

  public async deleteProduct(id: string): Promise<ReviewModel | null> {
    return await this.reviewModel.findByIdAndDelete(id).exec();
  }

  public async findByProductId(productId: string): Promise<ReviewModel[]> {
    return await this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
  }

  public async deleteByProductId(productId: string) {
    return await this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
  }
}
