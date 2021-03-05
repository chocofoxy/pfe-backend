import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    UsersModule, 
    AuthenticationModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.ku0vu.mongodb.net/pfe')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
