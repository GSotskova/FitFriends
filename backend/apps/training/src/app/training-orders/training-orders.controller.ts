import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { TrainingOrdersQuery } from '@project/shared/shared-query';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { CreateOrderDto } from '@project/shared/shared-dto';
import { TrainingOrderRdo } from './rdo/training-order.rdo';
import { TrainingOrdersService } from './training-orders.service';



@ApiTags('training-orders')
@Controller('orders')
export class TrainingOrdersController {
  constructor(
    private readonly orderService: TrainingOrdersService
  ) {}

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Create new order'
  })
  @Post('create')
  public async create(@Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.create(dto);
    return fillObject(TrainingOrderRdo, newOrder);
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Write off a workout from an order'
  })
  @Post('reduce/:id')
  public async reduceOrder(@Param('id', MongoidValidationPipe) id: string) {
    const newOrder = await this.orderService.update(id);
    return fillObject(TrainingOrderRdo, newOrder);
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Delete order'
  })
  @Delete('delete/:id')
  public async delete(@Param('id', MongoidValidationPipe) id: string) {
   return await this.orderService.delete(id);
  }


  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Show list orders for coach'
  })
  @Get('show/list')
  public async showList(@Body() body, @Query() query: TrainingOrdersQuery) {
    const existOrder = await this.orderService.showList(body.coachId, query);
    return fillObject(TrainingOrderRdo, existOrder);
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Show list orders for user'
  })
  @Get('show/list/user')
  public async showListUser(@Body() body, @Query() query: TrainingOrdersQuery) {
    const existOrder = await this.orderService.showListByUser(body.userId, query);
    return fillObject(TrainingOrderRdo, existOrder);
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Show order for user by training'
  })
  @Get('show/user/:trainingId')
  public async showUserTraining(@Body() body, @Param('trainingId') trainingId: string) {
    const existOrder = await this.orderService.showByUserAndTraining(body.userId, trainingId);
    return fillObject(TrainingOrderRdo, existOrder);
  }


  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Show order'
  })
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existOrder = await this.orderService.show(id);
    return fillObject(TrainingOrderRdo, existOrder);
  }

}
