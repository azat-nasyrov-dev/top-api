import { Module } from '@nestjs/common';
import { HhService } from './hh.service';
import { TopPageModule } from '../top-page/top-page.module';

@Module({
  imports: [TopPageModule],
  providers: [HhService],
})
export class HhModule {}
