import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode, Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { UpdateTopPageDto } from './dto/update-top-page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { HhService } from '../hh/hh.service';

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly topPageService: TopPageService,
    private readonly hhService: HhService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  public async create(@Body() dto: CreateTopPageDto) {
    return await this.topPageService.createTopPage(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findTopPageById(id);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return page;
  }

  @Get('byAlias/:alias')
  public async getByAlias(@Param('alias') alias: string) {
    const page = await this.topPageService.findByAlias(alias);

    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const deletedPage = await this.topPageService.deleteTopPageById(id);

    if (!deletedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateTopPageDto) {
    const updatedPage = await this.topPageService.updateTopPageById(id, dto);

    if (!updatedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }

    return updatedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  public async find(@Body() dto: FindTopPageDto) {
    return await this.topPageService.findByCategory(dto.firstCategory);
  }

  @Get('textSearch/:text')
  public async textSearch(@Param('text') text: string) {
    return await this.topPageService.findByText(text);
  }

  @Post('test')
  public async test() {
    const data = await this.topPageService.findForHhUpdate(new Date());

    for (const page of data) {
      const hhData = await this.hhService.getData(page.category);
      Logger.log(hhData);
      page.hh = hhData;

      await this.topPageService.updateTopPageById(page._id, page);
    }
  }
}
