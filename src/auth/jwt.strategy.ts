
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ExtractJwt,Strategy } from  "passport-jwt"
import { DBConfig } from '../core/config/db.config';

import { AppConstants } from '../core/constants/app.constants';
import { ExceptionConstants } from '../core/constants/exception.constants';
import { LoggerConstants } from '../core/constants/logger.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name)
  constructor(@Inject(DBConfig.USERS_MODEL) private readonly userModel  ) {
    super(
      {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : AppConstants.SECRET_KEY
      }
    );
  }

  async validate(payload): Promise<any> {
    
    this.logger.log(LoggerConstants.VALIDATING_PAYLOAD)
    const user = await this.userModel.findOne({_id : payload._id
      
    })
    
    if(!user ){
      this.logger.error(LoggerConstants.VALIDATING_PAYLOAD)
throw new HttpException(ExceptionConstants.UNAUTHORIZED ,HttpStatus.UNAUTHORIZED)
    }
    return user
  }
}