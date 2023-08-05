import { LevelTraining, TrainingTime, TrainingType } from '../../types/questionnaire';
import { StationMetro } from '../../types/station-metro';
import { UserSex } from '../../types/user';


export class EditUserDto {
  /**User */
  public userName?: string;
  public sex?: UserSex;
  public dateBirth?: string;
  public description?: string;
  public location?: StationMetro;

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
