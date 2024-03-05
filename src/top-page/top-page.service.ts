import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageDocument, TopPageModel } from './models/top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private readonly topPageModel: Model<TopPageDocument>,
  ) {}

  public async createTopPage(dto: CreateTopPageDto) {
    return await this.topPageModel.create(dto);
  }

  public async findTopPageById(id: string) {
    return await this.topPageModel.findById(id).exec();
  }

  public async findByAlias(alias: string) {
    return await this.topPageModel.findOne({ alias }).exec();
  }

  public async findByCategory(firstCategory: TopLevelCategory) {
    return await this.topPageModel
      .find(
        { firstCategory },
        {
          alias: 1,
          secondCategory: 1,
          title: 1,
        },
      )
      .exec();
  }

  public async findByText(text: string) {
    return await this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
  }

  public async deleteTopPageById(id: string) {
    return await this.topPageModel.findByIdAndDelete(id).exec();
  }

  public async updateTopPageById(id: string, dto: UpdateTopPageDto) {
    return await this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}