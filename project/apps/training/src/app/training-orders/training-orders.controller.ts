import { Body, Controller, Get, HttpStatus, Param, Post, Query} from '@nestjs/common';
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
  @Post('create/:userId')
  public async create(@Param('userId', MongoidValidationPipe) userId: string, @Body() dto: CreateOrderDto) {
    const newOrder = await this.orderService.create(userId, dto);
    return fillObject(TrainingOrderRdo, newOrder);
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Delete order'
  })
  @Post(':id')
  public async delete(@Param('id', MongoidValidationPipe) id: string) {
   return await this.orderService.delete(id);
  }


  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Show list orders'
  })
  @Get('show/list')
  public async showList(@Body() body, @Query() query: TrainingOrdersQuery) {
    const existPost = await this.orderService.showList(body.coachId, query);
    return fillObject(TrainingOrderRdo, existPost);
  }


}
