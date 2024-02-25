import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  public async register(@Body() dto: AuthDto) {}

  @HttpCode(200)
  @Post('login')
  public async login(@Body() dto: AuthDto) {}
}
