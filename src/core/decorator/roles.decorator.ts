import { applyDecorators, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AppConstants } from "../constants/app.constants";
import { ExceptionConstants } from "../constants/exception.constants";
import { RolesGuard } from "../guards/roles.guard";

import { LoggingInterceptor } from "../interceptors/logging.interceptor";

export function RolesDecorator( ...roles ){
    return applyDecorators (
        UseInterceptors(LoggingInterceptor) ,
        SetMetadata(AppConstants.ROLE , roles),

        UseGuards(RolesGuard),
        ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: ExceptionConstants.UNAUTHORIZED }),
        
    )
}