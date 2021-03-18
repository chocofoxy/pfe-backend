import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { StoreModule } from 'src/store/store.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports:[forwardRef(() => ClientModule),forwardRef(() => StoreModule)],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
