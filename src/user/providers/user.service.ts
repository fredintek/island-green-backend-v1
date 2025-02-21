import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    /**
     * Injecting User Repository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findOneUserByEmail(email: string) {
    let user: User | null;

    try {
      user = await this.userRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw new RequestTimeoutException('error', {
        description: 'Could not fetch user',
      });
    }

    if (!user) {
      throw new UnauthorizedException('user does not exist');
    }
    return user;
  }

  public async createUser(createUserDto: CreateUserDto) {
    let newUser: User;

    // check if user already exists
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    try {
      newUser = await this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('error', {
        description: 'Could not create user',
      });
    }

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }
}
