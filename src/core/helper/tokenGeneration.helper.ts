//these imports are made for HttpExceptions handling and logging purpose 
import { HttpException, HttpStatus, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

//import from jsonwebtoken library to create a valid token 
import * as jwt from 'jsonwebtoken'
//app configuration imports
import { AppConfig } from '../config/app.config'
//import of appconstants to access application related constants 
import { AppConstants } from '../constants/app.constants'
//imports of constants for exception handling
import { ExceptionConstants } from '../constants/exception.constants'
//import of logger constants to access logger messages
import { LoggerConstants } from '../constants/logger.constants'

export class Tokengeneration {
  private readonly logger = new Logger(Tokengeneration.name)
  
      generateToken= async( id ,role )=>{
try{

  
  this.logger.log(LoggerConstants.TG)
 
  
const token =await  jwt.sign({
    
    _id : id ,
    role : role
   
    
    

  },AppConstants.SECRET_KEY,{
    expiresIn:AppConstants.EXPIRES_IN
  })

  return token
}
catch(e){
  
  this.logger.error(LoggerConstants.TG_ERR)
  throw new HttpException(ExceptionConstants.TOKEN,HttpStatus.BAD_REQUEST)
}
}
}