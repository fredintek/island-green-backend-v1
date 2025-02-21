import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/providers/user.service';
import { HashingProvider } from './hashing.provider';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Inject User Service
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    /**
     * Inject Hashing Provider
     */
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // Find the user with email
    const user = await this.userService.findOneUserByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    if (!user.password) {
      throw new UnauthorizedException('Password not set, use forgot password');
    }

    // Compare password to the database hash
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password as string,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare password',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Invalid password');
    }
    return 'User token';
  }
}
