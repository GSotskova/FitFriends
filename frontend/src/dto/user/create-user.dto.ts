import { LevelTraining, TrainingTime, TrainingType } from '../../types/questionnaire';
import { StationMetro } from '../../types/station-metro';
import { UserRole, UserSex } from '../../types/user';


export class CreateUserDto {
  /**User */
  public userName!: string;
  public email!: string;
  public password!: string;
  public sex!: UserSex;
  public dateBirth!: string;
  public role!: UserRole;
  public description?: string;
  public location!: StationMetro;

  /**Add info for coach and users */
  public levelTraining?: LevelTraining;
  public trainingType?: TrainingType[];

  /**Add info for coach */
  public certificate?: string;
  public successCoach?: string;
  public isPersonal?: boolean;

  /**Add info for users */
  public trainingTime?: TrainingTime;
  public caloriesReset?: number;
  public caloriesSpend?: number;
  public isReady?: boolean;
}
