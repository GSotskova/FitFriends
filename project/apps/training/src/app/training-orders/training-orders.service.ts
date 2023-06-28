import { ConflictException, Injectable} from '@nestjs/common';
import { TrainingOrdersRepository } from './training-orders.repository';
import { TRANING_NOT_FOUND } from '../training-info/training-info.constant';
import { TrainingOrdersEntity } from './training-orders.entity';
import { CreateOrderDto } from '@project/shared/shared-dto';
import { TrainingOrdersQuery } from '@project/shared/shared-query';
import { TrainingRepository } from '../training-info/training-info.repository';
import { ORDER_TYPE } from './training-order.constant';


@Injectable()
export class TrainingOrdersService {
  constructor(
    private readonly ordersRepository: TrainingOrdersRepository,
    private readonly trainingRepository: TrainingRepository,

  ) {}

  public async create(userId: string, dto: CreateOrderDto) {
    const existTraining = await this.trainingRepository.findById(dto.trainingId)
    if (!existTraining) {
      throw new ConflictException(TRANING_NOT_FOUND);
    }
    const orderEntity = new TrainingOrdersEntity({
      ...dto,
      orderType: ORDER_TYPE,
      userId: userId,
      coachId: existTraining.coachId,
      totalPrice: existTraining.price *dto.trainingCount
    });
    return this.ordersRepository.create(orderEntity);
  }


  public async delete(id: string) {
    const existTraining = await this.ordersRepository.findById(id);
    if (!existTraining) {
      throw new ConflictException(TRANING_NOT_FOUND);
    }
    return this.ordersRepository.destroy(id);
  }

  public async showList(coachId: string, query: TrainingOrdersQuery) {
    const existTraining = await this.ordersRepository.findByCoachId(coachId, query);
    if (!existTraining) {
      throw new ConflictException(TRANING_NOT_FOUND);
    }
    return existTraining;
  }

}
