//nestjs imports
import { Module, OnModuleInit } from "@nestjs/common";
//import of database module needed to acess db
import { DatabaseModule } from "../db/database.module";
//import of modelProviders that are needeed for model injection
import { modelProviders } from "../db/model-Provider/model.provider";
import { BooksDAO } from "./dao/books.dao";

//import of AccountDAO that has methods for all account related operations
import { UserDAO } from "./dao/users.dao";
import { CheckAuth } from "./helper/checkAuth";
import { DecryptionHelper } from "./helper/decryption.helper";
import { EncryptionHelper } from "./helper/encryption.helper";
import { PasswordCompare } from "./helper/passwordCompare.helper";
import { PasswordHasher } from "./helper/passwordHasher.helper";

import { Tokengeneration } from "./helper/tokenGeneration.helper";



const services = [UserDAO ,Tokengeneration,CheckAuth,PasswordCompare,PasswordHasher,EncryptionHelper,DecryptionHelper,BooksDAO]
@Module({
    imports: [
       
        DatabaseModule ],
    providers: [
        
         ...services, ...modelProviders],
    exports: [ 
        
        DatabaseModule, ...services ]
})
export class CoreModule {}

    
