import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { ProductModel } from '../../product/models/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema()
export class ReviewModel {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: MSchema.Types.ObjectId, ref: ProductModel.name})
  productId: ProductModel;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
