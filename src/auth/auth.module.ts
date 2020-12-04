import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  controllers: [
    AuthController
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule { }
