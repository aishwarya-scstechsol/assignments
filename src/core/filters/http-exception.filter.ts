//These imports are made for http exceptions handling 
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
//These imports are made for implementing custom response logic 
import { Request, Response } from 'express';



@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch = (exception: any, host: ArgumentsHost) =>{
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>() 
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        
        response
          .status(status)
          .json({
            statusCode: exception.response.statusCode,
            timestamp: new Date().toISOString(),
            message : exception.response.message,
            Message : exception.message,
            path: request.url,
           
            description : exception.response.error
          });
      }
    }
    

