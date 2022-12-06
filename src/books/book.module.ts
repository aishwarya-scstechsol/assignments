
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AppConstants } from "../core/constants/app.constants";
import { CoreModule } from "../core/core.module";
import { modelProviders } from "../db/model-Provider/model.provider";


import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";

@Module({
    imports : [CoreModule,PassportModule.register({defaultStrategy :AppConstants.JWT})],
    controllers : [BooksController],
    providers : [BooksService,...modelProviders],
    
})
export class BookModule {}
