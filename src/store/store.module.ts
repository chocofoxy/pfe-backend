import { forwardRef, Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreResolver } from './store.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './entities/store.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    forwardRef(() => NotificationModule),
    forwardRef(() => UsersModule)
  ],
  providers: [StoreResolver, StoreService],
  exports: [StoreService]
})
export class StoreModule {}
