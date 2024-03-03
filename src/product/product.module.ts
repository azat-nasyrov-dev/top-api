import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './models/product.model';
import { ProductService } from './product.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductModel.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
