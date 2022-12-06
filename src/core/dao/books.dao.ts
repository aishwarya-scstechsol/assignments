//these imports are made for HttpExceptions handling and logging purpose 
import { Logger, Inject, BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
//Database configuration imports
import { DBConfig } from "../config/db.config";
import { ExceptionConstants } from "../constants/exception.constants";
import { LoggerConstants } from "../constants/logger.constants";
import { IBooksDAO } from "../interface/dao.interface/books.interface.dao";


export class BooksDAO implements IBooksDAO {
    private readonly logger = new Logger(BooksDAO.name);

    constructor(@Inject(DBConfig.BOOKS_MODEL) private booksModel, 
      
    ) { }




    createBook = async (book,user,file)=> {
        try{
            
            this.logger.log(LoggerConstants.CREATE_BOOK)
            let newBook = await this.booksModel.create({
                
                name : book.name , author : book.author , image : file.originalname , pages : book.pages , price : book.price,createdBy : user._id,createdAt  : Date.now() ,updatedAt : Date.now()
            })
            return newBook
            
        
        }
        catch(e){
        
            this.logger.error(LoggerConstants.CREATE_BOOK_ERR)
            throw new HttpException(ExceptionConstants.CREATE_BOOK , HttpStatus.BAD_REQUEST)
        }
    }




    getAllBooks=async ()=> {
    try{
        this.logger.log(LoggerConstants.GET_BOOK)
        let books = await this.booksModel.find()
        if(books.length===0){
            this.logger.error(LoggerConstants.GET_BOOK_ERR)
            throw new HttpException(ExceptionConstants.NO_RECORD_FOUND,HttpStatus.NOT_FOUND)
        }
        return books

    }
    catch(e){
        this.logger.error(LoggerConstants.GET_BOOK_ERR)
        throw new HttpException(ExceptionConstants.NO_RECORD_FOUND,HttpStatus.NOT_FOUND)
    }
    }
    getBookByID=async(id: any)=> {
        try{
            this.logger.log(LoggerConstants.GET_BOOK_BY_ID)
      
            let books = await this.booksModel.find({_id : id })
            
            if(books.length===0){
                this.logger.error(LoggerConstants.GET_BOOK_BY_ID_ERR)
                throw new HttpException(ExceptionConstants.NO_RECORD_FOUND,HttpStatus.NOT_FOUND)
            }
            return books
    
        }
        catch(e){
            this.logger.error(LoggerConstants.GET_BOOK_BY_ID_ERR)
            throw new HttpException(ExceptionConstants.NO_RECORD_FOUND,HttpStatus.NOT_FOUND)
        }
    }


    updateBookInfo= async (book: any, id: any)=> {
        try{
            await this.getBookByID(id)

            return await this.booksModel.updateOne({_id : id } , {"$set" : {price : book.price  , pages : book.pages , name : book.name , author : book.author}})

    
        }
        catch(e){
            this.logger.error(LoggerConstants.UPDATE_BOOK_ERR)
            throw new HttpException(ExceptionConstants.UPDATE_ERR,HttpStatus.BAD_REQUEST)
        }
    }
    deleteBook=async(id: any)=> {
        try{
            this.logger.log(LoggerConstants.DELETE_BOOK)
            await this.getBookByID(id)

            return await this.booksModel.deleteOne({_id : id } )
        }
        catch(e){
            this.logger.error(LoggerConstants.DELETE_BOOK_ERR)
            throw new HttpException(ExceptionConstants.DELETE_ERR,HttpStatus.BAD_REQUEST)
        }
    }
   
   bookExists= async (name)=>{
try{
this.logger.log(LoggerConstants.BOOK_EXISTS)
let book = await this.booksModel.find({name :  name })

if(book.length!=0){
    this.logger.error(LoggerConstants.BOOK_EXISTS_ERR)
    throw new HttpException(ExceptionConstants.BOOK_ALREADY_EXISTS , HttpStatus.CONFLICT)
}
   }
   
   catch(e){
    this.logger.error(LoggerConstants.BOOK_EXISTS_ERR)
    throw new HttpException(ExceptionConstants.BOOK_ALREADY_EXISTS , HttpStatus.CONFLICT)
   }
}


}