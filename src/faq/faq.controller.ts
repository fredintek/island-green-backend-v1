import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FaqService } from './providers/faq.service';
import { CreateFaqDto } from './dtos/create-faq.dto';
import { UpdateFaqDto } from './dtos/update-faq.dto';

@Controller('faq')
export class FaqController {
  constructor(
    /**
     * Injecting FAQ Service
     */
    private readonly faqService: FaqService,
  ) {}

  /**
   * Get All FAQ
   */
  @Get()
  getAllFaq() {
    return this.faqService.getAllFaq();
  }

  /**
   * Get Single FAQ
   */
  @Get(':faqId')
  getSingleFaq(@Param('faqId', ParseIntPipe) faqId: number) {
    return this.faqService.getSingleFaq(faqId);
  }

  /**
   * Create FAQ
   */
  @Post()
  createFaq(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.createFaq(createFaqDto);
  }

  /**
   * Update FAQ
   */
  @Patch()
  updateFaq(@Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.updateFaq(updateFaqDto);
  }

  @Delete(':faqId')
  deleteFaq(@Param('faqId', ParseIntPipe) faqId: number) {
    return this.faqService.deleteFaq(faqId);
  }
}
