import { Body, Controller, Get, HttpStatus, Param, Post, Query} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingService } from './training-info.service';
import { fillObject } from '@project/util/util-core';
import { TrainingQuery } from '@project/shared/shared-query';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { CreateTrainingDTO, EditTrainingDTO } from '@project/shared/shared-dto';
import { TrainingRdo } from './rdo/training-info.rdo';



@ApiTags('training-info')
@Controller('training')
export class TrainingInfoController {
  constructor(
    private readonly trainingService: TrainingService
  ) {}

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Create new training'
  })
  @Post('create')
  public async create(@Body() dto: CreateTrainingDTO) {
    const newTrainig = await this.trainingService.create(dto);
    return fillObject(TrainingRdo, newTrainig);
  }

  @Post('edit/:id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'User edit'
  })
  public async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: EditTrainingDTO) {
    const existUser = await this.trainingService.update(id, dto);
      return fillObject(TrainingRdo, existUser);

  }

  @Get(':id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.trainingService.show(id);
    return fillObject(TrainingRdo, existUser);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Show list posts'
  })
  @Get('list/:coachId')
  public async showList(@Param('coachId') coachId: string, @Query() query: TrainingQuery) {
    const existPost = await this.trainingService.showList(coachId, query);
    return fillObject(TrainingRdo, existPost);
  }


}
