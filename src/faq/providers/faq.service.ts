import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Faq } from '../faq.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FaqService {
  constructor(
    /**
     * Injecting the FAQ Repository
     */
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {}

  /**
   *  Get All FAQs
   */
  public async getAllFaq() {
    const faqs = await this.faqRepository.find();
    return {
      message: 'Successfully retrieved all FAQs',
      data: faqs,
    };
  }

  /**
   *  Get Single FAQ
   */
  public async getSingleFaq(faqId: number) {
    const faq = await this.faqRepository.findOne({ where: { id: faqId } });

    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${faqId} not found`);
    }

    return {
      message: 'Successfully retrieved FAQ',
      data: faq,
    };
  }

  /**
   *  Create FAQ
   */
  public async createFaq() {
    return 'Create FAQ';
  }

  /**
   *  Update FAQ
   */
  public async updateFaq() {
    return 'Update FAQ';
  }

  /**
   *  Delete FAQ
   */
  public async deleteFaq(faqId: number) {
    const faq = await this.faqRepository.findOne({ where: { id: faqId } });

    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${faqId} not found`);
    }

    await this.faqRepository.delete(faqId);

    return {
      message: 'FAQ deleted successfully',
    };
  }
}
