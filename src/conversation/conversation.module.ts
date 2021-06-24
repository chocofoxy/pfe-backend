import { forwardRef, Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Conversation, ConversationSchema } from './entities/conversation.entity';
import { UsersModule } from 'src/user/users.module';
import { StoreModule } from 'src/store/store.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
    forwardRef( () => StoreModule ),
    forwardRef( () => UsersModule ),
    forwardRef( () => ClientModule ),
  ],
  providers: [ConversationResolver, ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
