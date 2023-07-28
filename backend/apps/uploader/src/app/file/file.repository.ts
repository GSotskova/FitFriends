import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileModel } from './file.model';
import { Model } from 'mongoose';
import { FileEntity } from './file.entity';
import { File } from '@project/shared/shared-types';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileModel.name) private readonly fileModel: Model<FileModel>
  ) {}

  public async create(item: FileEntity): Promise<File> {
    const file = new this.fileModel(item);
    return file.save();
  }

  public async findById(id: string): Promise<File | null> {
    return this.fileModel
      .findOne({ _id: id})
      .exec();
  }

  public async findByObjectId(id: string, appName: string): Promise<File | null> {
    return this.fileModel
      .findOne({ objectId: id, appName})
      .exec();
  }
  public async update(id:string, item: FileEntity): Promise<File | null> {
    return this.fileModel.findByIdAndUpdate(id, item.toObject(), {new: true}).exec();
  }
  public async destroy(id: string): Promise<void> {
    await this.fileModel.deleteOne({_id: id});
  }
}
