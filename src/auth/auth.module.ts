import { forwardRef, Module, OnModuleInit } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppConstants } from "../core/constants/app.constants";
import { CoreModule } from "../core/core.module";
import { modelProviders } from "../db/model-Provider/model.provider";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports : [CoreModule,PassportModule.register({defaultStrategy :'jwt'}),JwtModule.register({secret :AppConstants.SECRET_KEY ,signOptions :{expiresIn : '1h'}})],
    controllers : [AuthController],
    providers : [AuthService,JwtStrategy,...modelProviders],
    exports : [JwtStrategy,PassportModule]
})
export class AuthModule implements OnModuleInit{
    onModuleInit() {
        
    }

}