import {Schema , Prop , SchemaFactory} from "@nestjs/mongoose"


import {Types} from "mongoose"
@Schema()
export class Books
{

    @Prop()
    name  : string 

    @Prop()
    image : string 

    @Prop()
    author  : string

    
    
    @Prop()
    pages : number

    @Prop()
    price : number

    @Prop()
    createdBy : Types.ObjectId

    @Prop()
    createdAt : Date

    @Prop()
    updatedAt :Date



}

export const RestaurantSchema = SchemaFactory.createForClass(Books)

