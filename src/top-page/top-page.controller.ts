import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TopPageModel } from './models/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  public async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Get(':id')
  public async get(@Param('id') id: string) {}

  @Delete(':id')
  public async delete(@Param('id') id: string) {}

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: TopPageModel) {}

  @HttpCode(200)
  @Post()
  public async find(@Body() dto: FindTopPageDto) {}
}
