import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'node:http';
import { brotliDecompressSync } from 'node:zlib';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { signinDto } from './dto/signin.dto';
import { signupDto } from './dto/signup.dto';
import { GetUser } from './getUser.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) signUpCredential: signupDto): Promise<void> {
        await this.authService.signUp(signUpCredential);
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) signInCredential: signinDto) {
        return await this.authService.signIn(signInCredential)
    }

   /*  @Get('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user){
        console.log(user)
    } */
}
