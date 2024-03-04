import { TopLevelCategory } from '../models/top-page.model';
import { IsEnum } from 'class-validator';

export class FindTopPageDto {
  @IsEnum(TopLevelCategory)
  readonly firstCategory: TopLevelCategory;
}
