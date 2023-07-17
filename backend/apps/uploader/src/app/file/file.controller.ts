import { Controller, UploadedFile, UseInterceptors, Get, Param, Inject, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { FileService } from './file.service';
import { fillObject } from '@project/util/util-core';
import { avatarFileFilter, imageFileFilter, pdfFileFilter, videoFileFilter } from '@project/util/util-upload';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { uploaderConfig } from '@project/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { AvatarsService } from '../avatars/avatars.service';
import { ImgTrainingService } from '../img-training/img-training.service';

@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService,

    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly avatarsService: AvatarsService,
    private readonly imgTrainingService: ImgTrainingService,
  ) {}


  @Post('upload/image/:id')
  @UseInterceptors(FileInterceptor('image', {fileFilter: imageFileFilter}))
  public async uploadImg(@UploadedFile() file: Express.Multer.File, @Param('id', MongoidValidationPipe) id: string) {
    const newFile = await this.fileService.saveFile(file, 'image', id);
    await this.imgTrainingService.trainingImg(id, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/video/:id')
  @UseInterceptors(FileInterceptor('video', {fileFilter: videoFileFilter}))
  public async uploadVideo(@UploadedFile() file: Express.Multer.File, @Param('id', MongoidValidationPipe) id: string) {
    const newFile = await this.fileService.saveFile(file, 'video', id);
    await this.imgTrainingService.trainingVideo(id, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/avatar/:userId')
  @UseInterceptors(FileInterceptor('file', {fileFilter: avatarFileFilter}))
  public async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Param('userId', MongoidValidationPipe) userId: string) {
    const newFile = await this.fileService.saveFile(file, 'avatar', userId);
    await this.avatarsService.userAvatars(userId, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/background/:userId')
  @UseInterceptors(FileInterceptor('background', {fileFilter: imageFileFilter}))
  public async userBackgroundImg(@UploadedFile() file: Express.Multer.File, @Param('userId', MongoidValidationPipe) userId: string) {
    const newFile = await this.fileService.saveFile(file, 'background', userId);
    await this.avatarsService.userBackgroundImg(userId, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Post('upload/certificate/:coachId')
  @UseInterceptors(FileInterceptor('certificate', {fileFilter: pdfFileFilter}))
  public async coachCertificate(@UploadedFile() file: Express.Multer.File, @Param('coachId') coachId: string) {
    const newFile = await this.fileService.saveFile(file, 'certificate', coachId);
    await this.avatarsService.coachCertificate(coachId, newFile.id);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }



  @Get(':fileId')
  public async show(@Param('fileId', MongoidValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}

