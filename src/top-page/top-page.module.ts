import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './models/top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema }])],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
