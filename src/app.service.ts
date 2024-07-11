import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto';

@Injectable()
export class AppService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDB connected');
  }
  
  async registerUser( registerUserDto: RegisterUserDto ){
    const { email, name, password } = registerUserDto;

    try {

      const user = await this.user.findFirst({
        where: {
          email
        }
      });

      if (user) {
        throw new BadRequestException('User already exists');
      }

      const newUser = await this.user.create({
        data: {
          email: email,
          password: password,
          name: name
        }
      });

      return {
        user: newUser,
        token: 'ABC'
      }

    } catch(error) {
      throw new BadRequestException(error.message);
    }
  }
}
