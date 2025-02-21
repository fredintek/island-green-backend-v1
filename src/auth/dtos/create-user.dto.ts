import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/user/user.entity';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
