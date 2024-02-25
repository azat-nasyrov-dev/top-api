import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './models/review.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema }])],
  controllers: [ReviewController],
})
export class ReviewModule {}
