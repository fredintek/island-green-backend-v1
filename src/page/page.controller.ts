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
import { PageService } from './providers/page.service';
import { CreatePageDto } from './dtos/create-page.dto';
import { UpdatePageDto } from './dtos/update-page.dto';

@Controller('page')
export class PageController {
  constructor(
    /**
     * Injecting the page service
     */
    private readonly pageService: PageService,
  ) {}

  @Post()
  createPage(@Body() createPageDto: CreatePageDto) {
    return this.pageService.createPage(createPageDto);
  }

  @Patch()
  updatePage(@Body() updatePageDto: UpdatePageDto) {
    return this.pageService.updatePage(updatePageDto);
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
