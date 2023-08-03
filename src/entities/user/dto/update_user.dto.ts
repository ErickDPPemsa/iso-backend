import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(5)
    fullName?: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    userName?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

}