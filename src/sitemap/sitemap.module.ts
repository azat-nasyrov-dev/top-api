import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { TopPageModule } from '../top-page/top-page.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TopPageModule],
  controllers: [SitemapController],
})
export class SitemapModule {}
