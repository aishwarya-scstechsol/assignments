//import of injectable to mark this class as a provider 
import { Injectable } from "@nestjs/common";
//import of ApiProperty from swagger to make these properties visible to swagger module 
import { ApiProperty } from "@nestjs/swagger";
//import of IsNotEmpty that makes sure that the entity isnt empty and IsString that checks if the entity is a string from class-validator to validate the entity 
import { IsNotEmpty, IsString, IsEmail, Matches, MaxLength, MinLength, IsPhoneNumber, IsEnum } from "class-validator";
//import to access application constants
import { AppConstants } from "../constants/app.constants";
import { Roles } from "../constants/enum.constants";
//import to accesss enum constants




@Injectable()
export class UsersDTO {

   

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name : String 

    
    


    @IsString()
    @ApiProperty()
    @IsNotEmpty({message : "please enter correct email ID"})
    @IsEmail()
    emailID: String


    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    // @Matches(AppConstants.PASSWORD_PATTERN,{message : AppConstants.PASSWORD_VALIDATION})
    password: String



    

   


    @ApiProperty()
    @IsNotEmpty()
    @IsEnum([Roles.ADMIN,Roles.USER])
    role : String 


    

   
   


}