import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto';

@Injectable()
export class AppService{

  private readonly logger = new Logger('AuthService');

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  async registerUser( registerUserDto: RegisterUserDto ){
    const { email, name, password } = registerUserDto;

    try {

      const user = await this.userModel.findOne({
        email: email
      }).exec();

      if (user) {
        throw new BadRequestException('User already exists');
      }

      const newUser = await this.userModel.create(
        {
          email: email,
          password: password,
          name: name
        }
      );

      return {
        user: newUser,
        token: 'ABC'
      }

    } catch(error) {
      throw new BadRequestException(error.message);
    }
  }
}
