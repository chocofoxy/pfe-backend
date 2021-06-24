import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from 'src/store/store.module';
import { ClientModule } from 'src/client/client.module';
import { Admin, AdminSchema } from './entities/admin.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    forwardRef(() => ClientModule),
    forwardRef(() => StoreModule),
    forwardRef(() => NotificationModule)
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
