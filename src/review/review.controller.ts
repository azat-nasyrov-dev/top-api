import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TelegramService } from '../telegram/telegram.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  public async create(@Body() dto: CreateReviewDto) {
    return await this.reviewService.createProduct(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('notify')
  public async notify(@Body() dto: CreateReviewDto) {
    const message =
      `Имя: ${dto.name}\n` +
      `Заголовок: ${dto.title}\n` +
      `Описание: ${dto.description}\n` +
      `Рейтинг: ${dto.rating}\n` +
      `ID Продукта: ${dto.productId}`;

    return await this.telegramService.sendMessage(message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.deleteProduct(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  public async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
    return await this.reviewService.findByProductId(productId);
  }
}
