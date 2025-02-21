import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { UserService } from 'src/user/providers/user.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

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

    /**
     * Inject GlobalConfiguration
     */
    private readonly generateTokensProvider: GenerateTokensProvider,

    /**
     * Injecting Global Configuration
     */
    private readonly configService: ConfigService,
  ) {}

  public async signIn(signInDto: SignInDto, res: Response) {
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

    const { accessToken, refreshToken } =
      await this.generateTokensProvider.generateTokens(user);

    // Set refresh token in HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly:
        this.configService.get('appConfig.environment') === 'production',
      secure: this.configService.get('appConfig.environment') === 'production', // Use secure cookies in production
      sameSite: 'strict',
      path: '/',
      maxAge:
        Number(this.configService.get('jwt.refreshTokenMaxAge')) *
        24 *
        60 *
        60 *
        1000,
    });

    // Send access token in response
    return res.status(200).json({
      message: 'Signed in successfully',
      accessToken,
    });
  }

  public async logout(res: Response) {
    // Clear refresh token cookie
    res.cookie('refreshToken', '', {
      httpOnly:
        this.configService.get('appConfig.environment') === 'production',
      secure: this.configService.get('appConfig.environment') === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0), // Expire the cookie immediately
    });

    return res.status(200).json({
      message: 'Logged out successfully',
    });
  }
}
