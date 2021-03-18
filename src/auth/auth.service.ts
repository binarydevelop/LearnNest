import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { signinDto } from './dto/signin.dto';
import { signupDto } from './dto/signup.dto';
import { UserRepository } from './entity/user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService){}

        async signUp(signUpcredentials: signupDto): Promise<void> {
           await this.userRepository.signUp(signUpcredentials)
        }
        async signIn(signInCredentials: signinDto) {
           const matched = await this.userRepository.validateUserPassword(signInCredentials);
           
           if(!matched){
               throw new UnauthorizedException('Invalid Credentials.')
           }
           const payload  = { matched }
           const accessToken = this.jwtService.sign(payload);
           
           return {accessToken};
        }

}
