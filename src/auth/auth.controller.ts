import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthService } from './providers/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from 'src/user/providers/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Injecting Auth Service
     */
    private readonly authService: AuthService,

    /**
     * Inject User Service
     */
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  /**
   * Sign In User
   */
  @Post('sign-in')
  @Auth(AuthType.None)
  public async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('create')
  public async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('forgot-password')
  public async forgotPassword() {
    return 'FORGOT PASSWORD';
  }

  @Patch('reset-password')
  public async resetPassword() {
    return 'RESET PASSWORD';
  }
}
