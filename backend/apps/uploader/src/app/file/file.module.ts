import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { FileRepository } from './file.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.model';
import { getRabbitMQOptions } from '@project/util/util-core';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AvatarsModule } from '../avatars/avatars.module';
import { ImgTrainingModule } from '../img-training/img-training.module';
import { join } from 'path';

console.log(join(__dirname, '../../..', 'apps/uploader/uploads'))
@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath =  'uploads';
        const serveRoot = configService.get<string>('application.serveRoot');
        return [{
          rootPath,
          serveRoot,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    }),
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    AvatarsModule,
    ImgTrainingModule
  ],
  providers: [FileService, FileRepository],
  controllers: [FileController]
})
export class FileModule {}
