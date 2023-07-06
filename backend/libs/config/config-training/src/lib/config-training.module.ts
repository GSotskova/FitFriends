import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import trainingConfig from './training.config';

const ENV_FILE_PATH = 'apps/training/.training.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [trainingConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigTrainingModule {}
