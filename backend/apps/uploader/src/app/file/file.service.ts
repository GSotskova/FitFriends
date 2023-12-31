import { uploaderConfig } from '@project/config/config-uploader';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import dayjs from 'dayjs';
import * as crypto from 'node:crypto';
import { extension } from 'mime-types';
import { FileRepository } from './file.repository';
import { FileEntity } from './file.entity';

type WritedFile = {
  hashName: string;
  fileExtension: string;
  subDirectory: string;
  path: string;
}

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly fileRepository: FileRepository,
  ) {}
  private async writeFile(file: Express.Multer.File): Promise<WritedFile> {
    const [ year, month ] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;
    const subDirectory = `${year}/${month}`;

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`;

    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  public async saveFile(file: Express.Multer.File, appName: string, objectId: string) {
    const writedFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writedFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writedFile.path,
      appName: appName,
      objectId: objectId
    });

    const existsFile = await this.fileRepository.findByObjectId(objectId, appName);
    if (existsFile && appName!=='certificate'){
      return await this.fileRepository.update(existsFile.id, newFile)
    }
    return await this.fileRepository.create(newFile);
  }

  public async updateFile(file: Express.Multer.File, appName: string, objectId: string, fileId: string) {
    const writedFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writedFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writedFile.path,
      appName: appName,
      objectId: objectId
    });

    const existsFile = await this.fileRepository.findById(fileId);
    if (existsFile){
      return await this.fileRepository.update(fileId, newFile)
    }
    return await this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string) {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }

  public async delete(id: string) {
    const existOrder = await this.fileRepository.findById(id);

    if (!existOrder) {
      throw new NotFoundException(`File with ${id} not found.`);
    }
    return this.fileRepository.destroy(id);
  }
}
