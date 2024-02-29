import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  public async create(@Body() dto: CreateReviewDto) {
    return await this.reviewService.createProduct(dto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.deleteProduct(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  public async getByProduct(@Param('productId') productId: string) {
    return await this.reviewService.findByProductId(productId);
  }
}
