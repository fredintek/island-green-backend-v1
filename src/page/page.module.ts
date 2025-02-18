import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './providers/page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { Section } from 'src/section/section.entity';
import { ProjectHouse } from 'src/project-house/project-house.entity';

@Module({
  controllers: [PageController],
  providers: [PageService],
  imports: [TypeOrmModule.forFeature([Page, Section, ProjectHouse])],
})
export class PageModule {}
