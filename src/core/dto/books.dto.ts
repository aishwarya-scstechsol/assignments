//import of injectable to mark this class as a provider 
import { Injectable } from "@nestjs/common";
//import of ApiProperty from swagger to make these properties visible to swagger module 
import { ApiProperty } from "@nestjs/swagger";
//import of IsNotEmpty that makes sure that the entity isnt empty and IsString that checks if the entity is a string from class-validator to validate the entity 
import { IsNotEmpty, IsString, IsEmail, Matches, MaxLength, MinLength, IsPhoneNumber, IsEnum, IsNumber } from "class-validator";
//import to access application constants
import { AppConstants } from "../constants/app.constants";
import { Roles } from "../constants/enum.constants";
//import to accesss enum constants




@Injectable()
export class BooksDTO {

   

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name : String 

    
    


    
    @ApiProperty()
    
    image : String


    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
   
    author : String


    @ApiProperty()
    
    @IsNotEmpty()
   pages : Number

    @ApiProperty()
   
    @IsNotEmpty()
    price : Number 
   



    

   

    

   
   


}