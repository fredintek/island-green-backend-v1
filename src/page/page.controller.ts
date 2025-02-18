import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PageService } from './providers/page.service';

@Controller('page')
export class PageController {
  constructor(
    /**
     * Injecting the page service
     */
    private readonly pageService: PageService,
  ) {}

  @Post()
  createPage(@Body() body: any) {
    return this.pageService.createPage(body);
  }

  @Get()
  fetchAllPages() {
    return this.pageService.fetchAllPages();
  }

  @Get(':id')
  fetchSinglePage(@Param('id', ParseIntPipe) id: number) {
    return this.pageService.fetchSinglePage(id);
  }

  @Delete(':id')
  deleteSinglePage(@Param('id', ParseIntPipe) id: number) {
    return this.pageService.deleteSinglePage(id);
  }
}
