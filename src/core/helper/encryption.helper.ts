import { BadRequestException, Logger } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { LoggerConstants } from '../constants/logger.constants';
export class EncryptionHelper{
  private readonly logger = new Logger (EncryptionHelper.name)
    encrypt = async(information ,iv , password)=>{
try{
  this.logger.log(LoggerConstants.ENCRYPTION)
        const  key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);


const encryptedText = Buffer.concat([
  cipher.update(information),
  cipher.final(),
])
return encryptedText}catch(e){
  this.logger.error(LoggerConstants.ENCRYPTION_ERR)
  throw new BadRequestException() 
}

    }}