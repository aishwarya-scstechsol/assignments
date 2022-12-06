//nest js import to indicate core module is a module
import { Module, OnModuleInit } from '@nestjs/common';
import {databaseProviders}  from './database.provider';
//import of database provider as its a provider

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}