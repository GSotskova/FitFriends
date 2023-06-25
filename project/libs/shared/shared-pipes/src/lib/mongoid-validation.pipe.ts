import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentsType } from './validate-constants';

const BAD_MONGOID_ERROR = 'Bad entity ID';

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== ArgumentsType.Param) {
      throw new Error('This pipe must used only with params!')
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
