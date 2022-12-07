import { UseGuards, UseInterceptors, UseFilters, Controller, Logger, Get, StreamableFile, Post, Body, Put, Res, Param, Delete, UploadedFile, ParseFilePipe, ValidationPipe } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiTags } from "@nestjs/swagger"
import { AppConfig } from "../core/config/app.config"
import { createReadStream } from "fs"
import { Query } from "mongoose"
import { join } from "path"
import { AppConstants } from "../core/constants/app.constants"
import { LoggerConstants } from "../core/constants/logger.constants"
import { HttpExceptionFilter } from "../core/filters/http-exception.filter"
import { LoggingInterceptor } from "../core/interceptors/logging.interceptor"
import { BooksService } from "./books.service"
import { RolesDecorator } from "../core/decorator/roles.decorator"
import { BooksDTO } from "../core/dto/books.dto"

import { CurrentUser } from '../core/decorator/user.decorator';
import { FileInterceptor } from "@nestjs/platform-express"
import { FileValidationPipe } from "../core/pipes/file.validationm.pipe"

@UseGuards(AuthGuard())
@UseInterceptors(LoggingInterceptor)
@UseFilters(new HttpExceptionFilter())
@ApiTags(AppConstants.TAG)
@Controller(AppConfig.API_PREFIX)

export class BooksController {
private readonly logger = new Logger(BooksController.name)
    constructor(
       
        private readonly booksService: BooksService) { }

@UseInterceptors(FileInterceptor(AppConstants.IMAGE , {dest : '/a'}))
@RolesDecorator(AppConstants.ADMIN)
@Post(AppConfig.CREATE_BOOK)
async createBook(@UploadedFile(new FileValidationPipe()) file: Express.Multer.File,@Body(new ValidationPipe({skipMissingProperties : false})) book : BooksDTO , @CurrentUser() user ){
    this.logger.log(LoggerConstants.CREATE_BOOK_C)
    
     await this.booksService.createBook(book,user,file)
     return AppConstants.CREATED_BOOK
}
       

@Get(AppConfig.GET_BOOKS)
async getBooks() {
this.logger.log(LoggerConstants.GET_BOOK_C)
return this.booksService.getBooks()
}
@Get(AppConfig.GET_BOOK_BY_ID)
async getBookByID(@Param (AppConfig.ID) id )  {
    this.logger.log(LoggerConstants.GET_BOOK_BY_ID_C)
    return this.booksService.getBooksById(id.id)
}
@RolesDecorator(AppConstants.ADMIN)
@Put(AppConfig.UPDATE_BOOK)
async updateBook(@Body () book ,@Param (AppConfig.ID) id  ) {
    this.logger.log(LoggerConstants.UPDATE_BOOK_C)
    await  this.booksService.updateBook(book , id.id)
    return AppConstants.UPDATED
}
@RolesDecorator(AppConstants.ADMIN)
@Delete(AppConfig.DELETE_BOOK)
async deleteBook(@Param (AppConfig.ID) id ) {
    this.logger.log(LoggerConstants.DELETE_BOOK_C)
    await  this.booksService.deleteBook(id.id)
    return AppConstants.DELETED
}



        

       



 





}
    

