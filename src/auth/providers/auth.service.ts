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
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

    /**
     * Injecting JWT Service
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting User Repository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async signIn(signInDto: SignInDto, res: Response) {
    // Find the user with email
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: signInDto.email })
      .addSelect('user.password')
      .getOne();

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
      sameSite: 'none',
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
      sameSite: 'none',
      path: '/',
      expires: new Date(0), // Expire the cookie immediately
    });

    return res.status(200).json({
      message: 'Logged out successfully',
    });
  }

  public async refreshToken(req: Request, res: Response) {
    // Get refresh token from cookie
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      return res.status(403).json({ message: 'forbidden to access' });
    }

    const secret = this.configService.get('jwt.secret');
    const payload = await this.jwtService.verifyAsync(refreshToken, { secret });

    if (!payload || !payload.sub) {
      return res.status(403).json({ message: 'forbidden to access' });
    }

    const user = await this.userRepository.findOne({
      where: { id: payload.userId },
    });

    if (!user) {
      return res
        .status(403)
        .json({ message: 'User not found, forbidden to access' });
    }

    const { accessToken } =
      await this.generateTokensProvider.generateAccessToken(user);

    return res.status(200).json({
      message: 'Refreshed successfully',
      accessToken,
    });
  }
}
