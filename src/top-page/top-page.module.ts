import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './models/top-page.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema }])],
  controllers: [TopPageController],
})
export class TopPageModule {}
