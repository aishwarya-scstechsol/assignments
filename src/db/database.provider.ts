//import of mongoose for db connection establishment 
import * as mongoose from 'mongoose';

//db configuration imports

import {DBConfig} from '../core/config/db.config'


  

export const databaseProviders = [
  {
    
    provide: DBConfig.DATABASECONNECTION,
    useFactory:   (): Promise<typeof mongoose> =>
      mongoose.connect( DBConfig.CONNECTION_STRING),
  },
];
