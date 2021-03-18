import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../jwt.payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/entity/user.repository';
import { Users } from './entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'QWSADASBXCNMZASIPASIUD',
    });
  }

  async validate(payload: JwtPayload): Promise<Users> {
    const { email } = payload;
    console.log(email)
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}