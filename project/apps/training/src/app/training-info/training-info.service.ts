import { ConflictException, Injectable} from '@nestjs/common';
import { TrainingRepository } from './training-info.repository';
import { TRANING_NOT_FOUND } from './training-info.constant';
import { TrainingEntity } from './training-info.entity';
import { CreateTrainingDTO, EditTrainingDTO } from '@project/shared/shared-dto';
import { TrainingQuery } from '@project/shared/shared-query';




@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,

  ) {}

  public async create(dto: CreateTrainingDTO) {
    const trainingEntity = new TrainingEntity({...dto, photoTraning: ' ',videoTraning:' ', rating: 0 });
    return this.trainingRepository.create(trainingEntity);

  }

  public async update(id: string, dto: EditTrainingDTO) {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new ConflictException(TRANING_NOT_FOUND);
    }
    const training = {
      ...dto,
      photoTraning: existTraining.photoTraning,
      videoTraning: existTraining.videoTraning,
      rating: existTraining.rating,
      coachId: existTraining.coachId
    };

    const trainingEntity = new TrainingEntity(training);
    return this.trainingRepository.update(id, trainingEntity);
  }

  public async show(id: string) {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new ConflictException(TRANING_NOT_FOUND);
    }
    return existTraining;
  }

  public async showList(coachId: string, query: TrainingQuery) {
    const existTraining = await this.trainingRepository.findByCoachId(coachId, query);
    if (!existTraining) {
      throw new ConflictException(TRANING_NOT_FOUND);
    }
    return existTraining;
  }

  public async getListTraingAfterDate(date: Date, coaches:[string]) {
    return this.trainingRepository.findTrainingAfterDate(date, coaches);
  }

}
