import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Communication } from '../communication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommunicationDto } from '../dtos/create-communication.dto';

@Injectable()
export class CommunicationService {
  constructor(
    /**
     * Injecting Communication Repository
     */
    @InjectRepository(Communication)
    private readonly communicationRepository: Repository<Communication>,
  ) {}

  /**
   * Create Communication
   */
  public async createCommunication(
    createCommunicationDto: CreateCommunicationDto,
  ) {
    const communication = this.communicationRepository.create({
      phoneNumber: JSON.stringify(createCommunicationDto.phoneNumber),
      email: JSON.stringify(createCommunicationDto.email),
      address: JSON.stringify(createCommunicationDto.address),
    });

    await this.communicationRepository.save(communication);

    return {
      message: 'Communication created successfully',
      data: communication,
    };
  }

  /**
   * Get All Communication
   */
  public async getAllCommunication() {
    const communication = await this.communicationRepository.find({});

    return {
      message: 'Communication retrieved successfully',
      data: communication,
    };
  }

  /**
   * Get Single Communication
   */
  public async getSingleCommunication(communicationId: number) {
    const communication = await this.communicationRepository.findOne({
      where: { id: communicationId },
    });

    if (!communication) {
      throw new NotFoundException(
        `Communication with ID ${communicationId} not found`,
      );
    }

    return {
      message: 'Communication retrieved successfully',
      data: communication,
    };
  }
}
