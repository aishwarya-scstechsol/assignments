import { PipeTransform, Injectable, ArgumentMetadata, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AppConstants } from '../constants/app.constants';
import { ExceptionConstants } from '../constants/exception.constants';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    private readonly logger =  new Logger (FileValidationPipe.name)
  transform(value: any, metadata: ArgumentMetadata) {
    try{
  if(value.mimetype  ===AppConstants.MIMETYPE1 || value.mimetype  ===AppConstants.MIMETYPE2||value.mimetype  ===AppConstants.MIMETYPE3){
    return value 
  }

  throw new HttpException ( ExceptionConstants.ONLY_IMAGES ,HttpStatus.BAD_REQUEST)
}
catch(e){
    throw new HttpException ( ExceptionConstants.PROPER_FILE ,HttpStatus.BAD_REQUEST)
}
  }
}