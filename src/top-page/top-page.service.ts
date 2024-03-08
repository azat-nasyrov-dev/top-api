import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageDocument, TopPageModel } from './models/top-page.model';
import { Model, Types } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';
import { addDays } from 'date-fns';

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

  public async findAll() {
    return await this.topPageModel.find({}).exec();
  }

  public async findByCategory(firstCategory: TopLevelCategory) {
    return await this.topPageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
  }

  public async findByText(text: string) {
    return await this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
  }

  public async deleteTopPageById(id: string) {
    return await this.topPageModel.findByIdAndDelete(id).exec();
  }

  public async updateTopPageById(id: string | Types.ObjectId, dto: UpdateTopPageDto) {
    return await this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  public async findForHhUpdate(date: Date) {
    return await this.topPageModel
      .find({
        firstCategory: 0,
        $or: [
          { 'hh.updatedAt': { $lt: addDays(date, -1) } },
          { 'hh.updatedAt': { $exists: false } },
        ],
      })
      .exec();
  }
}
