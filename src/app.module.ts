import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlAuthGuard } from './guards/jwt-auth.guard';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { ReviewModule } from './review/review.module';
import { ReportModule } from './report/report.module';
import { CategoryModule } from './category/category.module';
import { NotificationModule } from './notification/notification.module';
import { OrderModule } from './order/order.module';
import { BundleModule } from './bundle/bundle.module';
import { ClientModule } from './client/client.module';
import { MaterialModule } from './material/material.module';
import { ModelModule } from './model/model.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { RoleGuard } from './guards/role.guard';
import { PubSub } from 'apollo-server-express';
import { ConversationModule } from './conversation/conversation.module';
import { ScheduleModule } from '@nestjs/schedule';

@Global()
@Module({
  imports: [
    UsersModule, 
    AuthenticationModule,
    MulterModule.register({
      dest: './upload',
    }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      uploads: {
        maxFileSize: 200000000, // 20 MB
        maxFiles: 10
      },
      context: ({ req, connection }) => connection ? { req: connection.context } : { req },
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.ku0vu.mongodb.net/pfe'),
    ProductModule,
    StoreModule,
    ReviewModule,
    ReportModule,
    CategoryModule,
    NotificationModule,
    OrderModule,
    BundleModule,
    ClientModule,
    MaterialModule,
    ModelModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    }    
  ],
  exports:['PUB_SUB']
})
export class AppModule {}
