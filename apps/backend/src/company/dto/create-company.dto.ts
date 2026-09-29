import { IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @MinLength(3)
    name!: string;

    @IsUrl()
    @IsOptional()
    logo_url?: string;

    @IsString()
    address!: string;


}
