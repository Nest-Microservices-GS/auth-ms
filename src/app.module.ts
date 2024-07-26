import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
        useFactory: () => ({
          uri: process.env.DATABASE_URL
        }),
      }),
    ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h'}
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
