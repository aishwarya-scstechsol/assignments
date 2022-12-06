import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { CheckAuth } from "../helper/checkAuth";
//this import is made to acess methods in jsonwebtoken 
import * as jwt from 'jsonwebtoken'
import { AppConstants } from "../constants/app.constants";
import { LoggerConstants } from "../constants/logger.constants";
@Injectable()
export class RolesGuard implements CanActivate{
    private readonly logger = new Logger (RolesGuard.name)
    constructor(private reflector :Reflector , private checkAuth : CheckAuth){}

    
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       try{
        this.logger.log(LoggerConstants.GUARD)
        const roles = this.reflector.get<String[]>('roles',context.getHandler())
        
        if (!roles) {
           
            return true;
          }
          
          const request = context.switchToHttp().getRequest();
          const user = request.user
        
          let reuslt =  this.matchRoles(roles , user.role)
         return reuslt
            }
        
        catch(e){
            this.logger.error(LoggerConstants.GUARD_ERR)
            throw new UnauthorizedException()
        }
    }
    matchRoles(roles,requestedRole){
        let result  =false 
        roles.forEach(element => {
            if(element ===requestedRole)
        result = true
        
        });

return result 
        
    }
    
}