import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './providers/user.service';
import { UserRoleDto } from './dto/user-role.dto';

@Controller('user')
export class UserController {
  constructor(
    /**
     * Injecting User Service
     */
    private readonly userService: UserService,
  ) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':userId')
  getSingleUser(@Param('userId') userId: number) {
    return this.userService.getSingleUser(userId);
  }

  // change user role
  @Patch('role')
  async updateUserRole(@Body() userRoleDto: UserRoleDto) {
    return this.userService.updateUserRole(userRoleDto);
  }

  // delete user
  @Delete(':userId')
  deleteUser(@Param('userId') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
