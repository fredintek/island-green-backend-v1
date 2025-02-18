import { IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreatePageDto {
  @IsObject()
  @IsNotEmpty()
  title: {
    en: string;
    tr: string;
    ru: string;
  };

  @IsOptional()
  @IsNumber()
  parentPage?: number;
}
