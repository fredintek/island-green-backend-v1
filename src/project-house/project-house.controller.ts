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
import { ProjectHouseService } from './providers/project-house.service';
import { CreateProjectHouseDto } from './dtos/create-project-house.dto';
import { UpdateProjectHouseDto } from './dtos/update-project-house.dto';

@Controller('project-house')
export class ProjectHouseController {
  constructor(
    /**
     * Injecting Project House Service
     */
    private readonly projectHouseService: ProjectHouseService,
  ) {}

  @Post()
  createProjectHouse(@Body() createProjectHouseDto: CreateProjectHouseDto) {
    return this.projectHouseService.createProjectHouse(createProjectHouseDto);
  }

  @Patch()
  updateProjectHouse(@Body() updateProjectHouseDto: UpdateProjectHouseDto) {
    return this.projectHouseService.updateProjectHouse(updateProjectHouseDto);
  }

  @Delete(':projectHouseId')
  deleteProjectHouse(
    @Param('projectHouseId', ParseIntPipe) projectHouseId: number,
  ) {
    return this.projectHouseService.deleteProjectHouse(projectHouseId);
  }

  @Get()
  getAllProjectHouses() {
    return this.projectHouseService.getAllProjectHouses();
  }

  @Get(':projectHouseId')
  getSingleProjectHouse(
    @Param('projectHouseId', ParseIntPipe) projectHouseId: number,
  ) {
    return this.projectHouseService.getProjectHouseById(projectHouseId);
  }
}
