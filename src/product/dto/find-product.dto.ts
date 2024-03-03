import { IsNumber, IsString } from 'class-validator';

export class FindProductDto {
  @IsString()
  readonly category: string;

  @IsNumber()
  readonly limit: number;
}
