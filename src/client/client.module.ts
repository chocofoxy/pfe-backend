import { forwardRef, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity';
import { UsersModule } from 'src/user/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    forwardRef(() => UsersModule)
  ],
  providers: [ClientResolver, ClientService],
  exports: [ClientService]
})
export class ClientModule {}
