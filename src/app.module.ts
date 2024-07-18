import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/AuthDB'),
    MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]),
    JwtModule.register({
      global: true,
      secret: 'AirBo0MLiberty3',
      signOptions: { expiresIn: '2h'}
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
