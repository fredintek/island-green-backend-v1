import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateFaqDto {
  @IsObject()
  @IsNotEmpty()
  question: {
    en: string;
    tr: string;
    ru: string;
  };

  @IsObject()
  @IsNotEmpty()
  answer: {
    en: string;
    tr: string;
    ru: string;
  };
}
