import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { CheckAuth } from "../helper/checkAuth";
//this import is made to acess methods in jsonwebtoken 
import * as jwt from 'jsonwebtoken'
import { AppConstants } from "../constants/app.constants";
@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector :Reflector , private checkAuth : CheckAuth){}

    
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       
        const roles = this.reflector.get<String[]>('roles',context.getHandler())
        
        if (!roles) {
           
            return true;
          }
          
          const request = context.switchToHttp().getRequest();
          const user = request.user
        
          let reuslt =  this.matchRoles(roles , user.role)
         return reuslt
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