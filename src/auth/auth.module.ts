import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './entity/user.repository';
import { JwtModule } from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register( {defaultStrategy : 'jwt'} ),
    JwtModule.register( { secret: 'QWSADASBXCNMZASIPASIUD',
                          signOptions: { expiresIn: 3600 }
                      } ),
    TypeOrmModule.forFeature([UserRepository]) //filled with repository or entity to be used in this module. 
  ],
  controllers: [ AuthController ],
  providers:   [ AuthService,
                 JwtStrategy    ],
  exports:     [ JwtStrategy,
                 PassportModule ]
})
export class AuthModule {}
