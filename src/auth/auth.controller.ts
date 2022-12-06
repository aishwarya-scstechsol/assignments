import { Post, Req, Body, ValidationPipe, Res, Logger, Controller, UseFilters, UseInterceptors, Param, Get } from "@nestjs/common"
import { ApiCreatedResponse } from "@nestjs/swagger"
import { AppConfig } from "../core/config/app.config"

import { AppConstants } from "../core/constants/app.constants"
import { LoggerConstants } from "../core/constants/logger.constants"
import { UsersDTO } from "../core/dto/users.dto"
import { AuthService } from "./auth.service"
import {Request , Response } from "express"
import { LoginDTO } from "../core/dto/login.dto"
import { HttpExceptionFilter } from "../core/filters/http-exception.filter"
import { LoggingInterceptor } from "../core/interceptors/logging.interceptor"

@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller(AppConfig.API_PREFIX_USERS)
export class AuthController {
private readonly logger = new Logger(AuthController.name)

constructor (private readonly authService : AuthService){}
    /**create admin
         * 
         * @param information 
         * @param res 
         * @returns 
         */
     @ApiCreatedResponse()
        
     @Post()
     
     async createUsers( @Body(new ValidationPipe({ skipMissingProperties: false })) information : UsersDTO) {
        this.logger.verbose("boom")
         this.logger.log(LoggerConstants.CREATE_USER_C)
         let result = await this.authService.createUser(information)
         return AppConstants.USER_CREATION
      
 
     }


     @ApiCreatedResponse()
        @Post(AppConfig.LOGIN)
       
        async login (  @Body(new ValidationPipe({ skipMissingProperties: false })) credentials :LoginDTO , 
        
        ){
            this.logger.log(LoggerConstants.LOGIN_C)
           
            let result = await this.authService.login(credentials)
            return result
           
            
        }

}