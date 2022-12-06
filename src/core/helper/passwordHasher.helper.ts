import { BadRequestException, Logger } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { LoggerConstants } from "../constants/logger.constants"
export class PasswordHasher {
  private readonly logger =  new Logger (PasswordHasher.name)
    hashPassword=async(password)=> {
        try{
            this.logger.log(LoggerConstants.HASH_PASSWORD)
        let salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password , salt)
        return hash

    }


catch(er){
    this.logger.error(LoggerConstants.HASH_PASSWORD_ERR)
    throw new BadRequestException()
}
    }
}