import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from './models/user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
    });

    return newUser.save();
  }

  public async findUser(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
