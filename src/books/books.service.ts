
//imports from nestjs 
import { Injectable, Logger } from '@nestjs/common';

import { randomBytes } from 'crypto';
import { async } from 'rxjs';
import { LoggerConstants } from '../core/constants/logger.constants';
import { BooksDAO } from '../core/dao/books.dao';




@Injectable()
export class BooksService {
    private readonly iv = randomBytes(16)

    private readonly logger = new Logger(BooksService.name)
    constructor(

        private readonly bookDAO: BooksDAO



    ) { }

    createBook = async (book, user,file) => {
        this.logger.log(LoggerConstants.CREATE_BOOK_S)
        
        await this.bookDAO.bookExists(book.name)
        return await this.bookDAO.createBook(book,user,file)
    }

    getBooks = async () => {
        this.logger.log(LoggerConstants.GET_BOOK_S)
        return await this.bookDAO.getAllBooks()

    }

    getBooksById = async (id) => {
        this.logger.log(LoggerConstants.GET_BOOK_C)
        return await this.bookDAO.getBookByID(id)
    }

    updateBook = async (book , id) => {
        this.logger.log(LoggerConstants.UPDATE_BOOK_S)
        return await this.bookDAO.updateBookInfo(book , id )

    }

    deleteBook = async (id) => {
        this.logger.log(LoggerConstants.DELETE_BOOK_S)
        return await this.bookDAO.deleteBook(id)

    }
}
