import { TopLevelCategory } from '../models/top-page.model';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class HhDataDto {
  @IsNumber()
  readonly count: number;

  @IsNumber()
  readonly juniorSalary: number;

  @IsNumber()
  readonly middleSalary: number;

  @IsNumber()
  readonly seniorSalary: number;
}

export class TopPageAdvantageDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  readonly firstCategory: TopLevelCategory;

  @IsString()
  readonly secondCategory: string;

  @IsString()
  readonly alias: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
  readonly hh?: HhDataDto;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  readonly advantages: TopPageAdvantageDto[];

  @IsString()
  readonly seoText: string;

  @IsString()
  readonly tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];
}
