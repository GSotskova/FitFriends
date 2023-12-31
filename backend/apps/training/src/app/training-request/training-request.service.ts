import { Injectable, NotFoundException} from '@nestjs/common';
import {  USER_IS_INITIATOR, REQUEST_NOT_FOUND, REQUEST_EXISTS } from './training-request.constant';
import { TrainingRequestRepository } from './training-request.repository';
import { TrainingRequestEntity } from './training-request.entity';
import { CreateRequestDto } from '@project/shared/shared-dto';
import { StatusRequest } from '@project/shared/shared-types';



@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly requestRepository: TrainingRequestRepository
  ) {}

  public async create(dto: CreateRequestDto) {
    if (dto.userId === dto.initiatorId) {
     throw new NotFoundException(USER_IS_INITIATOR);
    }
    const reqTrain = await this.requestRepository.findId(dto.initiatorId, dto.userId)
    const isExists = reqTrain.find((el) => el.typeRequest === dto.typeRequest && el.statusRequest === dto.statusRequest);
    if (isExists) {
     throw new NotFoundException(REQUEST_EXISTS);
    }

    const requestEntity = new TrainingRequestEntity(dto);
    return this.requestRepository.create(requestEntity);
  }

  public async updateStatus(id: string, newStatus: StatusRequest) {
    const existsRequests = await this.requestRepository.findById(id)
    if (!existsRequests) {
     throw new NotFoundException(REQUEST_NOT_FOUND);
    }
    if (existsRequests.statusRequest === newStatus) {
      return existsRequests
    }
    return this.requestRepository.updateStatus(id, newStatus);
  }

  public async getRequest(initiatorId: string, coachId: string) {
    const existsRequests = await this.requestRepository.findId(initiatorId, coachId)
    if (!existsRequests) {
      return {error: REQUEST_NOT_FOUND}
    }
    return this.requestRepository.findId(initiatorId, coachId);
  }

  public async delete(id: string) {
    const existsRequests = await this.requestRepository.findById(id)
    if (!existsRequests) {
      return {error: REQUEST_NOT_FOUND}
    }
    return this.requestRepository.destroy(existsRequests._id);
  }

}
