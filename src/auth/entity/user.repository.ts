import { ConflictException, HttpException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { signupDto } from "../dto/signup.dto";
import { Users } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { signinDto } from "../dto/signin.dto";
import { JwtService } from "@nestjs/jwt";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  constructor( private jwtService: JwtService ) { super(); }
  
  async signUp(signUpcredentials: signupDto): Promise<void> {
      const { username, email, password } =  signUpcredentials;
      let new_user = new Users();
      new_user.username = username;
      new_user.salt = await bcrypt.genSalt(10);
      new_user.email = email;
      new_user.password =await this.hash(password, new_user.salt);

      try{
        await new_user.save();
      }
      catch(err){
        throw new ConflictException('Username already Exists.')
      }
  }


 async validateUserPassword(signInCredentials: signinDto): Promise<string> {
      const { email, password } = signInCredentials;
      const user = await this.findOne({email})
      
      if (user && await user.validatePassword(password)) {
        return user.email;
      } else {
        return null;
      }
  }

  private async hash(password: string, salt: string):Promise<string>{
    return bcrypt.hash(password,salt);
  }
}