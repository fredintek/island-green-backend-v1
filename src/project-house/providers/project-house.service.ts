import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProjectHouse } from '../project-house.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectHouseDto } from '../dtos/create-project-house.dto';
import { Page } from 'src/page/page.entity';
import { UpdateProjectHouseDto } from '../dtos/update-project-house.dto';

@Injectable()
export class ProjectHouseService {
  constructor(
    /**
     * Inecting Project House Entity
     */
    @InjectRepository(ProjectHouse)
    private readonly projectHouse: Repository<ProjectHouse>,

    /**
     * Inecting Page Entity
     */
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  public async createProjectHouse(
    createProjectHouseDto: CreateProjectHouseDto,
  ) {
    // check if project page exists
    const projectPage = await this.pageRepository.findOne({
      where: { id: createProjectHouseDto.projectPage },
    });

    if (!projectPage) {
      throw new NotFoundException('Invalid project page');
    }

    // Create new project house
    const newProjectHouse = this.projectHouse.create({
      ...createProjectHouseDto,
      projectPage,
    });

    await this.projectHouse.save(newProjectHouse);

    return {
      message: 'Project house created successfully',
      data: newProjectHouse,
    };
  }

  public async updateProjectHouse(
    updateProjectHouseDto: UpdateProjectHouseDto,
  ) {
    const { id, ...updateData } = updateProjectHouseDto;
    const projectHouse = await this.projectHouse.findOne({ where: { id } });

    if (!projectHouse) {
      throw new NotFoundException(`Project house with id ${id} not found.`);
    }

    // Update the fields dynamically
    Object.assign(projectHouse, updateData);

    await this.projectHouse.save(projectHouse);

    return {
      message: 'Project house updated successfully',
      data: projectHouse,
    };
  }
}
