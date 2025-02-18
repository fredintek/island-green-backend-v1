import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Section } from '../section.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSectionDto } from '../dtos/create-section.dto';

@Injectable()
export class SectionService {
  constructor(
    /**
     * Injecting Section Repository
     */
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  /**
   * Create Section
   */
  createSection(sectionBody: CreateSectionDto) {
    console.log('sectionBody', sectionBody);
    return 'Create Section';
  }

  /**
   * Get All Section
   */
  getAllSection() {
    return 'Get All Section';
  }

  /**
   * Get Single Section
   */
  getSingleSection() {
    return 'Get Single Section';
  }
}
