import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { UpdateProductDto } from './dto/update-product.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  public async create(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findProductById(id);

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedProduct = await this.productService.deleteProductById(id);

    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  public async update(@Param('id', IdValidationPipe) id: string, @Body() dto: UpdateProductDto) {
    const updatedProduct = await this.productService.updateProductById(id, dto);

    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return updatedProduct;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  public async find(@Body() dto: FindProductDto) {
    return await this.productService.findWithReviews(dto);
  }
}
