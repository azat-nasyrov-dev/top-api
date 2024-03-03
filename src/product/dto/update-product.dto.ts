import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductCharacteristicDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly value: string;
}

export class UpdateProductDto {
  @IsString()
  readonly image: string;

  @IsString()
  readonly title: string;

  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsNumber()
  readonly oldPrice?: number;

  @IsNumber()
  readonly credit: number;

  @IsString()
  readonly description: string;

  @IsString()
  readonly advantages: string;

  @IsString()
  readonly disAdvantages: string;

  @IsArray()
  @IsString({ each: true })
  readonly categories: string[];

  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDto)
  readonly characteristics: ProductCharacteristicDto[];
}
