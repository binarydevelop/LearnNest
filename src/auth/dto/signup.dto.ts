import { IsEmail, IsNotEmpty, IsString, isString, MaxLength, MinLength, MIN_LENGTH } from "class-validator";

export class signupDto {
    @IsNotEmpty({message: "Username cannot be empty."})
    @IsString({message: "Username must be a string."})
    @MinLength(6,{message: "Minimum Length is 6."})
    @MaxLength(20,{message: "Maximum Length is 20."})
    username: string;

     
    @IsNotEmpty({message: "Email cannot be empty."})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: "Password cannot be Empty."})
    @MinLength(6,{message: "Password must be 6 characters."})
    @MaxLength(128,{message: "Password must be less than 128."})
    password: string;
}