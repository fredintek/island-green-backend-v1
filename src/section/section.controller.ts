import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SectionService } from './providers/section.service';
import { CreateSectionDto } from './dtos/create-section.dto';
import { ContentLinkRemovalDto } from './dtos/remove-link-from-content.dto';
import { UpdateSectionDto } from './dtos/update-section.dto';

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
  createSection(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.createSection(createSectionDto);
  }

  /**
   * Update Section Data
   */
  @Patch()
  updatePage(@Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.updateSection(updateSectionDto);
  }

  /**
   * Remove Specific From Section Content
   */
  @Patch('remove-link')
  RemoveLinkFromContent(@Body() contentLinkRemovalDto: ContentLinkRemovalDto) {
    return this.sectionService.RemoveLinkFromContent(contentLinkRemovalDto);
  }

  /**
   * Get All Section
   */
  @Get('/page/:pageId')
  getAllSectionByPage(@Param('pageId', ParseIntPipe) pageId: number) {
    return this.sectionService.getAllSectionByPage(pageId);
  }

  /**
   * Get Single Section
   */
  @Get(':sectionId')
  getSingleSection(@Param('sectionId', ParseIntPipe) sectionId: number) {
    return this.sectionService.getSingleSection(sectionId);
  }
}
