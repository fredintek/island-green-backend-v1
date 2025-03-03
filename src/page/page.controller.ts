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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleType } from 'src/auth/enums/role-type.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CreateBulkProjectDto } from './dtos/createBulkProject.dto';

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

  @Post('bulk-project')
  createBulkProject(@Body() createBulkProjectDto: CreateBulkProjectDto) {
    return this.pageService.createBulkProject(createBulkProjectDto);
  }

  @Delete('bulk-project/:id')
  deleteBulkProject(@Param('id', ParseIntPipe) id: number) {
    return this.pageService.deleteBulkProject(id);
  }

  @Patch()
  @Roles(RoleType.Admin, RoleType.Editor)
  updatePage(@Body() updatePageDto: UpdatePageDto) {
    return this.pageService.updatePage(updatePageDto);
  }

  @Get()
  @Auth(AuthType.None)
  fetchAllPages() {
    return this.pageService.fetchAllPages();
  }

  @Get(':id')
  @Auth(AuthType.None)
  fetchSinglePage(@Param('id', ParseIntPipe) id: number) {
    return this.pageService.fetchSinglePage(id);
  }

  @Get('name/:slug')
  @Auth(AuthType.None)
  fetchPageBySlug(@Param('slug') slug: string) {
    return this.pageService.fetchPageBySlug(slug);
  }

  @Delete(':id')
  deleteSinglePage(@Param('id', ParseIntPipe) id: number) {
    return this.pageService.deleteSinglePage(id);
  }
}
