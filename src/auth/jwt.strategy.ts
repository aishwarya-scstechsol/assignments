
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ExtractJwt,Strategy } from  "passport-jwt"
import { DBConfig } from '../core/config/db.config';

import { AppConstants } from '../core/constants/app.constants';

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
    this.logger.verbose(payload)
    this.logger.log("inside jwt strategy")
    const user = await this.userModel.findOne({_id : payload._id
      
    })
    this.logger.verbose(user)
    if(!user ){
throw new HttpException("UNAUTHORIZED" ,HttpStatus.UNAUTHORIZED)
    }
    return user
  }
}