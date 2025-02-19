import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FaqService } from './providers/faq.service';

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
  createFaq() {
    return 'Create FAQ';
  }

  /**
   * Update FAQ
   */
  @Post()
  updateFaq() {
    return 'Update FAQ';
  }

  @Delete(':faqId')
  deleteFaq(@Param('faqId', ParseIntPipe) faqId: number) {
    return this.faqService.deleteFaq(faqId);
  }
}
