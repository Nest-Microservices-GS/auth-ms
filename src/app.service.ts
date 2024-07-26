import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto, RegisterUserDto } from './dto';

import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService{

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}
  
  async signJWT( payload ) {
    return this.jwtService.sign(payload)
  }

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
          password: await argon2.hash(password),
          name: name
        }
      );

      return {
        user: newUser,
        token: await this.signJWT({email: newUser.email, name: newUser.name})
      }

    } catch(error) {
      throw new BadRequestException(error.message);
    }
  }

  async loginUser( loginUserDto: LoginUserDto ){
    const { email, password } = loginUserDto;

    try {

      const user = await this.userModel.findOne({
        email: email
      }).exec();

      if ( !user ) {
        throw new BadRequestException('Invalid credentials');
      }

      const isValid = argon2.verify(user.password, password);

      if(!isValid) {
        throw new BadRequestException('Invalid credentials');
      }

      return {
        user: user,
        token: await this.signJWT({email: user.email, name: user.name})
      }

    } catch(error) {
      throw new BadRequestException(error.message);
    }
  }

  async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user} = this.jwtService.verify(token,{
        secret: process.env.JWT_SECRET
      });

      return {
        user: user,
        token: await this.signJWT({email: user.email, name: user.name})
      }

    } catch(error) {
      throw new BadRequestException(error.message);
    }
  }
}
