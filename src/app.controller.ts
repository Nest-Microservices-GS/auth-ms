import { Body, Controller, Get, Headers, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { log } from 'console';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  registerUser( @Body() registerUserDto: RegisterUserDto) {
    return this.appService.registerUser( registerUserDto );
  }

  @Post('login')
  loginUser( @Body() loginUserDto: LoginUserDto) {
    return this.appService.loginUser( loginUserDto );
  }

  @Get('verify')
  verifyToken(@Headers('authorization') auth) {
    const token = auth.split(' ')[1];
    return this.appService.verifyToken(token);
  }
}
