import { Inject, Injectable, Logger } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { EncryptionHelper } from "../core/helper/encryption.helper";

import { promisify } from "util";

import { LoggerConstants } from "../core/constants/logger.constants";
import { UserDAO } from "../core/dao/users.dao";
import { PasswordCompare } from "../core/helper/passwordCompare.helper";
import { PasswordHasher } from "../core/helper/passwordHasher.helper";
import { Tokengeneration } from "../core/helper/tokenGeneration.helper";
import { DecryptionHelper } from "../core/helper/decryption.helper";
import { async } from "rxjs";


@Injectable()

export class  AuthService{
    private readonly iv = randomBytes(16)
    private readonly logger = new Logger(AuthService.name)
    constructor(
       
        private readonly user: UserDAO,
        private readonly passwordHash : PasswordHasher,
        private readonly TokenGeneration : Tokengeneration,
      
       
        private readonly PasswordHash : PasswordHasher  ,
        private readonly PasswordCompare : PasswordCompare,
        private readonly encrypt : EncryptionHelper
        ,
        private readonly decrypt : DecryptionHelper
        
        
        
    ) { }
    // constructor (@Inject(DBConfig.USERS_MODEL) private readonly usersModel ){}

// validateUser = async (emailID :string ,password :string ) : Promise<any>=>{
//     this.logger.log("authenticating user")
//     const user = await this.usersModel.findOne({emailID : emailID})
//     this.logger.verbose(user)


// }



/**create user
 * 
 * @param userInformation 
 * @returns 
 */
createUser = async (userInformation ) =>{
    
    this.logger.log(LoggerConstants.CREATE_USER_S)
    
    
    let password = await this.passwordHash.hashPassword(userInformation.password)
  
    return await this.user.createUser(userInformation ,password)
    }


    login = async(credentials)=>{
        this.logger.log(LoggerConstants.LOGIN_S)
       
       
      
                        let user = await this.user.user(credentials.emailID)
                      
                        let match : Boolean = await this.PasswordCompare.comparePassword(credentials.password ,user.password )
                      
                        if(match) {
                        let token = await this.TokenGeneration.generateToken(user._id ,user.role)
                        return {"token" : token}
                        }
                   

    }
tryEncryption =async(information)=>{
  
    this.logger.log("try encryption at service")
   
   let informationTOBeEncrypted =JSON.stringify(information)
    const encryptedText = await this.encrypt.encrypt(informationTOBeEncrypted , this.iv , "password")
    

let id = await this.user.tryEncryption(encryptedText)

return id 



}



retrieve =async(id)=>{
    this.logger.log('retrieving')
    let see = await this.user.find(id)

    let decryptedText = await this.decrypt.decrypt(see.information ,this.iv ,"password")
    this.logger.verbose(decryptedText)

    let seeq = decryptedText.toString()
   let  s =JSON.parse(seeq)

this.logger.error(s)
    
    return s
}

}