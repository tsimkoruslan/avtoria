import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as Filter from 'bad-words';
import { AppError } from '../common/constans/errors';


@Injectable()
export class ProfanityValidationPipe implements PipeTransform {
  private filter:  Filter;

  constructor() {
    this.filter = new Filter();
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string' || this.filter.isProfane(value)) {
      throw new BadRequestException(AppError.BAD_WORDS);
    }
    return value;
  }

}
