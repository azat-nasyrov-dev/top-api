import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageSchema } from './models/top-page.model';
import { TopPageService } from './top-page.service';
import { HhModule } from '../hh/hh.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageSchema }]),
    HhModule,
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
  exports: [TopPageService],
})
export class TopPageModule {}
