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
    const existTrainig = await this.trainingService.update(id, dto);
      return fillObject(TrainingRdo, existTrainig);

  }

  @Get(':id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existTrainig = await this.trainingService.show(id);
    return fillObject(TrainingRdo, existTrainig);
  }


  @Get('show/list')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Show list training'
  })
  public async showList(@Body() body, @Query() query: TrainingQuery) {
    console.log('showList', body.coachId)
    const existTrainig = await this.trainingService.showList(body.coachId, query);
    return fillObject(TrainingRdo, existTrainig);
  }


}
