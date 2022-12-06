import { BadRequestException, Logger } from "@nestjs/common";
import { createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { LoggerConstants } from "../constants/logger.constants";

export class DecryptionHelper{
  private readonly logger = new Logger(DecryptionHelper.name)
    decrypt= async(encryptedText ,iv ,password ) =>{
      try{
        this.logger.log(LoggerConstants.DECRYPTION)
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, iv);

        
const decryptedText = Buffer.concat([
  decipher.update(encryptedText),
  decipher.final(),
]);

            
            
            
return decryptedText

      }
      catch(e) {
        this.logger.error(LoggerConstants.DECRYPTION_ERR)
        throw new BadRequestException()
      }
    }
}