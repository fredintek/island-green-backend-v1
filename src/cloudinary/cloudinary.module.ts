import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './providers/cloudinary.service';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService]
})
export class CloudinaryModule {}
