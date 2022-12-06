import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Roles } from "../constants/enum.constants";
import { Document } from "mongoose";
@Schema()
export class User extends Document {
    
    @Prop()
    name : string 

    @Prop({unique : [true , "email email email"]})
    emailID :string 

    @Prop()
    password : string 

    @Prop({enum : Roles, default : Roles.USER})
    role : Roles

    @Prop()
    information : Buffer

    @Prop()
    createdAt : Date

    @Prop()
    updatedAt :Date



}

export const UsersSchema = SchemaFactory.createForClass(User)