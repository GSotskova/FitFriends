import { Injectable} from '@nestjs/common';
import { TrainingOrdersRepository } from './training-orders.repository';
import { TrainingOrdersEntity } from './training-orders.entity';
import { CreateOrderDto } from '@project/shared/shared-dto';
import { TrainingOrdersQuery } from '@project/shared/shared-query';
import { TrainingRepository } from '../training-info/training-info.repository';
import { ORDER_IS_DONE, ORDER_NOT_FOUND, ORDER_TYPE, TRAINING_NOT_FOUND } from './training-order.constant';


@Injectable()
export class TrainingOrdersService {
  constructor(
    private readonly ordersRepository: TrainingOrdersRepository,
    private readonly trainingRepository: TrainingRepository,

  ) {}

  public async create(dto: CreateOrderDto) {
    const existTraining = await this.trainingRepository.findById(dto.trainingId)
    if (!existTraining) {
      return {error: TRAINING_NOT_FOUND}
    }
    const orderEntity = new TrainingOrdersEntity({
      ...dto,
      orderType: ORDER_TYPE,
      coachId: existTraining.coachId,
      price: existTraining.price,
      totalPrice: existTraining.price *dto.trainingCount,
      trainingRestCount: dto.trainingCount,
      trainingDoneCount: 0,
      isDone: false
    });
    return this.ordersRepository.create(orderEntity);
  }

  public async update(orderId: string) {
    const existOrder = await this.ordersRepository.findById(orderId)
    if (!existOrder) {
      return {error: ORDER_NOT_FOUND}
    }

    if (existOrder.isDone) {
      return {error: ORDER_IS_DONE}
    }
    const orderEntity = new TrainingOrdersEntity({
      ...existOrder,
      orderType: ORDER_TYPE,
      coachId: existOrder.coachId,
      totalPrice: (existOrder.trainingRestCount-1) *existOrder.price,
      trainingDoneCount: existOrder.trainingDoneCount+1,
      trainingRestCount: existOrder.trainingRestCount-1,
      isDone: existOrder.trainingRestCount-1 === 0? true : false
    });
    return this.ordersRepository.update(orderId, orderEntity);
  }


  public async delete(id: string) {
    const existOrder = await this.ordersRepository.findById(id);

    if (!existOrder) {
      return {error: ORDER_NOT_FOUND}
    }
    return this.ordersRepository.destroy(existOrder._id);
  }

  public async showList(coachId: string, query: TrainingOrdersQuery) {
    const existOrder = await this.ordersRepository.findByCoachId(coachId, query);
    if (!existOrder) {
      return {error: ORDER_NOT_FOUND}
    }
    return existOrder;
  }

  public async showListByUser(userId: string, query: TrainingOrdersQuery) {
    const existOrder = await this.ordersRepository.findByUserId(userId, query);
    if (!existOrder) {
      return {error: ORDER_NOT_FOUND}
    }
    return existOrder;
  }

  public async showByUserAndTraining(userId: string, trainingId: string) {
    const existOrder = await this.ordersRepository.findByUserIdTrainingId(userId, trainingId);
    if (!existOrder) {
      return {error: ORDER_NOT_FOUND}
    }
    return existOrder;
  }

  public async show(id:string) {
    const existOrder = await this.ordersRepository.findById(id);
    if (!existOrder) {
      return {error: ORDER_NOT_FOUND}
    }
    return existOrder;
  }

  public async createTestData(order) {
    const orderEntity = new TrainingOrdersEntity(order);
    return this.ordersRepository.create(orderEntity);

  }

}
