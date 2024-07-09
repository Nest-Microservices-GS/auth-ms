import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  registerUser( @Body() registerUserDto: RegisterUserDto) {
    return this.appService.getHello();
  }

  @Post('login')
  loginUser( @Body() loginUserDto: LoginUserDto) {
    return this.appService.getHello();
  }

  @Get('verify')
  verifyToken() {
    return this.appService.getHello();
  }
}
