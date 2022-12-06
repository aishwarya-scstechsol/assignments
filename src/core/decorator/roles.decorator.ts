import { applyDecorators, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { RolesGuard } from "../guards/roles.guard";

import { LoggingInterceptor } from "../interceptors/logging.interceptor";

export function RolesDecorator( ...roles ){
    return applyDecorators (
        UseInterceptors(LoggingInterceptor) ,
        SetMetadata('roles' , roles),

        UseGuards(RolesGuard),
        ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        
    )
}