import { Module } from "@nestjs/common";
import {AuthModule} from  "./auth/auth.module"
import { BookModule } from "./books/book.module";
@Module({
  imports: [AuthModule,BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
