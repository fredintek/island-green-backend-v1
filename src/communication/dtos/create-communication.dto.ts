import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PhoneNumberDto {
  @IsString()
  number: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class CreateCommunicationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhoneNumberDto)
  phoneNumber: PhoneNumberDto[];

  @IsArray()
  @IsEmail({}, { each: true })
  email: string[];

  @IsArray()
  @IsString({ each: true })
  address: string[];
}
