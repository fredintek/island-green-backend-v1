import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    GenerateTokensProvider,
  ],
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([User])],
  exports: [AuthService],
})
export class AuthModule {}
