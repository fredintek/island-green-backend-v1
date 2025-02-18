import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { Page } from '../page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePageDto } from '../dtos/create-page.dto';
import { UpdatePageDto } from '../dtos/update-page.dto';

@Injectable()
export class PageService {
  constructor(
    /**
     * Injecting Page Repository
     */

    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  public async createPage(createPageDto: CreatePageDto) {
    let providedParentPage: Page | undefined;

    try {
      if (createPageDto.parentPage) {
        providedParentPage = (await this.pageRepository.findOne({
          where: { id: createPageDto.parentPage },
        })) as Page;

        if (!providedParentPage) {
          throw new BadRequestException('Invalid parent page');
        }
      }

      // Create new page
      const newPage = this.pageRepository.create({
        ...createPageDto,
        parentPage: providedParentPage,
      });

      await this.pageRepository.save(newPage);
      return {
        message: 'Page created successfully',
        data: newPage,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || error.response.statusCode,
      );
    }
  }

  public async updatePage(updatePageDto: UpdatePageDto) {
    const { id, ...updateData } = updatePageDto;

    try {
      const page = await this.pageRepository.findOne({ where: { id } });
      if (!page) {
        throw new NotFoundException(`Page with ID ${id} not found`);
      }

      // Update the fields dynamically
      Object.assign(page, updateData);

      if (updatePageDto.parentPage) {
        const parentPage = await this.pageRepository.findOne({
          where: { id: updatePageDto.parentPage },
        });

        if (!parentPage) {
          throw new BadRequestException(
            `Parent page with ID ${updatePageDto.parentPage} not found`,
          );
        }
        page.parentPage = parentPage;
      }

      // Save the updated page
      return await this.pageRepository.save(page);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || error.response.statusCode,
      );
    }
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
      relations: ['subPages'],
      where: {
        parentPage: IsNull(),
      },
    });
    return pages;
  }

  public async deleteSinglePage(id: number) {
    const deletedPage = await this.pageRepository.delete({ id });
    return deletedPage;
  }
}
