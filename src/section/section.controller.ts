import { Body, Controller, Get, Post } from '@nestjs/common';
import { SectionService } from './providers/section.service';
import { CreateSectionDto } from './dtos/create-section.dto';

@Controller('section')
export class SectionController {
  constructor(
    /**
     * Injecting Section Service
     */
    private readonly sectionService: SectionService,
  ) {}

  /**
   * Create Section
   */
  @Post()
  createSection(@Body() sectionBody: CreateSectionDto) {
    return this.sectionService.createSection(sectionBody);
  }

  /**
   * Get All Section
   */
  @Get()
  getAllSection() {
    return 'Get All Section';
  }

  /**
   * Get Single Section
   */
  @Get()
  getSingleSection() {
    return 'Get Single Section';
  }
}
