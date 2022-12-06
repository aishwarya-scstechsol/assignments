import { HttpException, HttpStatus, Logger } from "@nestjs/common"

import * as bcrypt from "bcrypt"
import { ExceptionConstants } from "../constants/exception.constants"
import { LoggerConstants } from "../constants/logger.constants"
import { HttpExceptionFilter } from "../filters/http-exception.filter"

export class PasswordCompare{
    private readonly logger = new Logger(PasswordCompare.name)
    comparePassword = async(password , hash) :Promise<Boolean> =>{
        this.logger.log(LoggerConstants.PASSWORD_COMPARISION)
        
let isMatch  = await bcrypt.compare(password,hash)
if(isMatch){
return isMatch
}
else{
    throw new HttpException(ExceptionConstants.INVALID_CREDENTIALS,HttpStatus.FORBIDDEN)
}
    }
}