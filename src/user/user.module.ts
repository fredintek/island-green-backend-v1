import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
