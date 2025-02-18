import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Page } from '../page.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PageService {
  constructor(
    /**
     * Injecting Page Repository
     */

    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  public async createPage(body) {
    const newPage = this.pageRepository.create(body);
    await this.pageRepository.save(newPage);
    return newPage;
  }

  public async fetchSinglePage(id: number) {
    const pages = await this.pageRepository.find({
      where: { id },
      relations: ['subPages', 'parentPage'],
    });
    return pages;
  }

  public async fetchAllPages() {
    const pages = await this.pageRepository.find({
      relations: ['subPages', 'parentPage'],
    });
    return pages;
  }

  public async deleteSinglePage(id: number) {
    const deletedPage = await this.pageRepository.delete({ id });
    console.log('deleted page: ' + deletedPage);
    return deletedPage;
  }
}
