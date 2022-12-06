//these imports are made for HttpExceptions handling and logging purpose 
import { Logger, Inject, BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
//Database configuration imports
import { DBConfig } from "../config/db.config";
import { AppConstants } from "../constants/app.constants";
//import of constants for exception handling 
import { ExceptionConstants } from "../constants/exception.constants";
//imports of constants for logging
import { LoggerConstants } from "../constants/logger.constants";
//Interface that the AccountDAO implements
import { IUserDAO } from "../interface/dao.interface/users.interface.dao";

export class UserDAO implements IUserDAO {
    private readonly logger = new Logger(UserDAO.name);

    constructor(@Inject(DBConfig.USERS_MODEL) private UsersModel, 
      
    ) { }
   
   


/**create user
 * 
 * @param UserInformation 
 * @param password 
 * @param profilePicture 
 * @returns 
 */
    createUser = async (UserInformation, password) => {
try{
    let userExists = await this.UsersModel.find({emailID : UserInformation.emailID})
    if(userExists.length != 0){
        this.logger.error("USer exists")
        throw new HttpException("user exists" , HttpStatus.CONFLICT)
    }
        let user = await this.UsersModel.create({
            name : UserInformation.name,
            emailID : UserInformation.emailID,
            password :password,
            role : UserInformation.role
        })
        return user
    }
    catch(e) {
this.logger.error(e)
throw new HttpException("user exists" , HttpStatus.CONFLICT)
    }

        

       
    }

userExists = async(emailID)=>{
    this.logger.log(LoggerConstants.USER_EXISTS)
let user = await this.UsersModel.find({emailID : emailID})
if(user.length != 0){
    throw new BadRequestException(ExceptionConstants.USER_EXISTS)
}
}

user = async(emailID)=>{
    try{
        let user
        this.logger.log(LoggerConstants.USER_EXISTS)
let users = await this.UsersModel.find({emailID :emailID})

if(users.length===0){
    this.logger.error(LoggerConstants.USER_EXISTS_ERR)
        throw new HttpException(ExceptionConstants.USER_NOT_FOUND,HttpStatus.BAD_REQUEST)
}
users.forEach(element => {

user = element
});
return user
    }
    catch(e){
       
        this.logger.error(LoggerConstants.USER_EXISTS_ERR)
        throw new HttpException(ExceptionConstants.USER_NOT_FOUND,HttpStatus.BAD_REQUEST)
    }
}

get = async (emailID) =>{
    // await this.UsersModel.createIndex({emailID : 1})
    // this.UsersModel.createIndex( { emailID : -1 }, function(err, result) {
    
    //  })

    return await this.UsersModel.find({emailID : emailID})
}

getUsers=async() =>{
    return await this.UsersModel.findOne({_id :  "637dd2427e589c96254369c9"})
}

tryEncryption =
async(info) =>{
    this.logger.log("try encryption")
    let record = await this.UsersModel.create({information :info})
    return record._id

}
find = async (id) => 
{
let result = await this.UsersModel.findOne({_id : id })
return result
}
}

