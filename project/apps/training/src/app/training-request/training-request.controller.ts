import {  Body, Controller, Delete, HttpStatus, Param, Post  } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { TrainingRequestService } from './training-request.service';
import { CreateRequestDto } from '@project/shared/shared-dto';
import { TrainingRequestRdo } from './rdo/training-request.rdo';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';


@ApiTags('training-request')
@Controller('request')
export class TrainingRequestController {
  constructor(
    private readonly requestService: TrainingRequestService,

  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create request'
  })
  @Post('create')
  public async create(@Body() dto: CreateRequestDto) {
    const newTrainingRequests = await this.requestService.create(dto);
    return fillObject(TrainingRequestRdo, newTrainingRequests);
  }
  @ApiResponse({
    type: TrainingRequestRdo,
    status: HttpStatus.OK,
    description: 'Update status'
  })
  @Post('update/:id')
  public async updateStatus(@Param('id', MongoidValidationPipe) id: string, @Body() body) {
    const updRequest = await this.requestService.updateStatus(id, body.statusRequest);
    return fillObject(TrainingRequestRdo, updRequest);
  }

  @ApiResponse({
    type: TrainingRequestRdo,
    status: HttpStatus.OK,
    description: 'Delete request'
  })
  @Delete('delete/:id')
  public async delete(@Param('id', MongoidValidationPipe) id: string) {
   return await this.requestService.delete(id);
  }
}
