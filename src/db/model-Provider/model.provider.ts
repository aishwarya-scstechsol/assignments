//import from mongoose for connection 
import { Connection} from 'mongoose';
import { RestaurantSchema } from '../../core/schemas/books.schema'

//import of db config for db related configurations
import { DBConfig } from '../../core/config/db.config';
//import of AccountSchema
import { UsersSchema } from '../../core/schemas/users.schema';





export const modelProviders = [
  
  {
    provide: DBConfig.USERS_MODEL,
    useFactory: (connection: Connection) => connection.model(DBConfig.USERS, UsersSchema  ),
    inject: [DBConfig.DATABASECONNECTION],

  },
  {
    provide : DBConfig.BOOKS_MODEL,
    useFactory : (connection : Connection) => connection.model(DBConfig.BOOKS,RestaurantSchema),
    inject : [DBConfig.DATABASECONNECTION]
  }
]