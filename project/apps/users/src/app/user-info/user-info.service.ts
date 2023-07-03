import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { UserRepository } from './user-info.repository';
import { UsersQuery } from '@project/shared/shared-query';
import { USERS_NOT_FOUND, USER_NOT_FOUND } from './user-info.constant';
import { UserEntity } from './user-info.entity';
import { CreateUserDto, EditUserDto } from '@project/shared/shared-dto';
import { User, UserRole } from '@project/shared/shared-types';
import dayjs from 'dayjs';
import { QuestionnaireUserEntity } from '../questionnaire-user/questionnaire-user.entity';
import { QuestionnaireCoachEntity } from '../questionnaire-coach/questionnaire-coach.entity';
import { QuestionnaireCoachRepository } from '../questionnaire-coach/questionnaire-coach.repository';
import { QuestionnaireUserRepository } from '../questionnaire-user/questionnaire-user.repository';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly questionnaireCoachRepository: QuestionnaireCoachRepository,
    private readonly questionnaireUserRepository: QuestionnaireUserRepository,
  ) {}

    public async getUser(id: string) {
    return this.userRepository.findById(id);
  }


  public async getUsers(query: UsersQuery) {
   const existUsers = await this.userRepository.findAll(query);
   if (!existUsers) {
     throw new NotFoundException(USERS_NOT_FOUND);
   }
   return this.userRepository.findAll(query);
  }

  public async updateById(userId: string, dto: EditUserDto) {
    const existUser = await this.userRepository.findById(userId);
    if (!existUser) {
      throw new ConflictException(USER_NOT_FOUND);
    }
    const userEntity = await this.getGeneralUserEntity(null, dto, existUser)
    await this.userRepository.update(userId, userEntity);
    if (existUser.role === UserRole.Coach) {
      const coachEntity = await this.getCoachEntity(userId, dto)
      await this.questionnaireCoachRepository.updateByUserId(userId, coachEntity);
      return this.userRepository.getInfoCoach(existUser._id);
      }
      const coachUser = await this.getUserEntity(userId, dto)
      await this.questionnaireUserRepository.updateByUserId(userId, coachUser);
      return this.userRepository.getInfoUser(existUser._id);
    }

    public async changeCoachCetrificate(coachId: string, fileId: string) {
      const existUser = await this.userRepository.findById(coachId);
      if (!existUser)   {
      return {error: USERS_NOT_FOUND}
      }
      return this.questionnaireCoachRepository.updateCertificate(coachId, fileId);
    }




  public getGeneralUserEntity(createDto: CreateUserDto, editDto?: EditUserDto, user?: User) : UserEntity {
    if(createDto) {
    const item =  {
      userName: createDto.userName, email: createDto.email,
      avatar: '', passwordHash: '',
      sex: createDto.sex, dateBirth: dayjs(createDto.dateBirth).toDate(),
      role: createDto.role, description: createDto.description,
      location: createDto.location, backgroundImg: ''
    };
    return new UserEntity(item)
  }
  else {
    const item =  {
      userName: editDto.userName,email: user.email,
      avatar: editDto.avatar, passwordHash: user.passwordHash,
      sex: editDto.sex, dateBirth: dayjs(editDto.dateBirth).toDate(),
      role: user.role, description: editDto.description,
      location: editDto.location, backgroundImg: editDto.backgroundImg
    };
    return new UserEntity(item)
  }
  }

  public getUserEntity(userId :string, dto: CreateUserDto | EditUserDto) : QuestionnaireUserEntity {
    const item = {
      userId: userId, levelTraining: dto.levelTraining,
      trainingType: dto.trainingType,
      trainingTime: dto.trainingTime, caloriesReset: dto.caloriesReset,
      caloriesSpend: dto.caloriesSpend, isReady: dto.isReady
    };
    return new QuestionnaireUserEntity(item)
  }

  public getCoachEntity(userId :string, dto: CreateUserDto| EditUserDto) : QuestionnaireCoachEntity {
    const item = {
      userId: userId, levelTraining: dto.levelTraining,
      trainingType: dto.trainingType,
      certificate: dto.certificate, successCoach: dto.successCoach,
      isPersonal: dto.isPersonal
    };
    return new QuestionnaireCoachEntity(item)
  }


}
