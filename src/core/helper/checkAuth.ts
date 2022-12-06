//import of jwt from jsonwebtoken library needed to verify and check the authenticity of the token
import { Logger, UnauthorizedException } from '@nestjs/common'
//this import is made to acess methods in jsonwebtoken 
import * as jwt from 'jsonwebtoken'
import { decode } from 'punycode'
// app constants import to acsess  apllication constants
import { AppConstants } from '../constants/app.constants'
//this import is made to acess exception constants for exception handling
import { ExceptionConstants } from '../constants/exception.constants'
//this import is made to access logger messages
import { LoggerConstants } from '../constants/logger.constants'


export class CheckAuth {
    private readonly logger = new Logger(CheckAuth.name)
    /**METHOD CHECKS THE TOKEN IS VALID OR NOT 
     * 
     * @param token 
     * @returns 
     */
    checkauth = async (token) => {



        try {
            this.logger.log(LoggerConstants.CHECK_AUTH)
            
            const decoded = await jwt.verify(token.split(" ")[1], AppConstants.SECRET_KEY)
     
            return decoded


        }
        catch (e) {
            this.logger.error(LoggerConstants.CHECK_AUTH_ERR)
            throw new UnauthorizedException
        }




    }
}