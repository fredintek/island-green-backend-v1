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
import { CommunicationService } from './providers/communication.service';
import { CreateCommunicationDto } from './dtos/create-communication.dto';
import { UpdateCommunicationDto } from './dtos/update-communication.dto';

@Controller('communication')
export class CommunicationController {
  constructor(
    /**
     * Injecting Communication Service
     */
    private readonly communicationService: CommunicationService,
  ) {}

  /**
   * Create a new Communication
   */
  @Post()
  createCommunication(@Body() createCommunicationDto: CreateCommunicationDto) {
    return this.communicationService.createCommunication(
      createCommunicationDto,
    );
  }

  @Get()
  getAllCommunication() {
    return this.communicationService.getAllCommunication();
  }

  @Get(':communicationId')
  getCommunicationById(
    @Param('communicationId', ParseIntPipe) communicationId: number,
  ) {
    return this.communicationService.getSingleCommunication(communicationId);
  }

  @Patch()
  updateCommunication(@Body() updateCommunicationDto: UpdateCommunicationDto) {
    return this.communicationService.updateCommunication(
      updateCommunicationDto,
    );
  }

  @Delete(':communicationId')
  deleteCommunication(
    @Param('communicationId', ParseIntPipe) communicationId: number,
  ) {
    return this.communicationService.deleteCommunication(communicationId);
  }
}
