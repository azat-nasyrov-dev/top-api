import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;
}
