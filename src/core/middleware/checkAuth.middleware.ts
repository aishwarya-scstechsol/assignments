import { Injectable, Logger, NestMiddleware ,UnauthorizedException} from "@nestjs/common";
import { LoggerConstants } from "../constants/logger.constants";
@Injectable()
export class checkAuthMiddleware implements NestMiddleware{
    private readonly logger = new Logger(checkAuthMiddleware.name)
    use(req: any, res: any, next: (error?: any) => void) {
        this.logger.log(LoggerConstants.MIDDLEWARE)
        if(req.headers.authorization === undefined){
            throw new UnauthorizedException
        }

        next()


    }
    
}