
import { IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(5)
    fullName: string;

    @IsString()
    @MinLength(5)
    userName: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsIn(["admin", "user"])
    role?: string;

}