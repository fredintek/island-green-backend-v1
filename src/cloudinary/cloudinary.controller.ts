import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CloudinaryService } from './providers/cloudinary.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(
    /**
     * Injecting Cloudinary service
     */
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Delete('remove-file')
  @Auth(AuthType.None)
  async deleteImage(@Body('publicId') publicId: string) {
    if (!publicId) {
      throw new HttpException('Public ID is required', HttpStatus.BAD_REQUEST);
    }

    const isDeleted = await this.cloudinaryService.deleteImage(publicId);

    if (isDeleted) {
      return { message: 'Image deleted successfully' };
    } else {
      throw new HttpException('Failed to delete image', HttpStatus.BAD_REQUEST);
    }
  }
}
