import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation, MessageEvent } from './entities/conversation.entity';
import { PubSub } from 'apollo-server-express';
import { Inject } from '@nestjs/common';
import { CurrentUser, getUser } from 'src/guards/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { MessageConversationInput } from './dto/message-conversation.input';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private readonly conversationService: ConversationService,
    @Inject('PUB_SUB') private pubSub: PubSub
    ) {}

  @Query(() => [Conversation], { name: 'conversation' })
  findAll() {
    return this.conversationService.findAll();
  }

  @Query(() => Conversation, { name: 'conversation' , nullable: true })
  findOne(@Args('id', { type: () => String }) id: String) {
    return this.conversationService.findOne(id);
  }

  @Mutation(() => Conversation)
  sendMessage(@Args('MessageConversationInput') input: MessageConversationInput, @CurrentUser() user ) {
    return this.conversationService.sendMessage( user , input.to , input.message );
  }

  @Subscription(returns => Conversation ,{
    filter: (payload, variables, context ) => {
      const  conversation  = payload['New-Conversation']
      const user = context.req.user   
      if ( conversation.seller._id == user.id ||  conversation.client._id == user.id )
      return true
      else
      return false
      
    },
    resolve(this , value) {
      return value['New-Conversation'] ;
    }
  })
  newConversation() {
    return this.pubSub.asyncIterator('New-Conversation');
  }

  @Subscription(returns => MessageEvent ,{
    filter: (payload, variables, context ) => {
      const  { conversation , message }  = payload
      //console.log(conversation)
      //payload.conversation = conversation._id
      const user = context.req.user 
      //console.log(conversation.seller._id,conversation.client._id)  
      if ( conversation.seller._id == user.id ||  conversation.client._id == user.id )
      return true
      else
      return false
    },
    resolve(this , value) {
      const { conversation , message } = value
      return { conversation: conversation._id , message}
    }
  })
  newMessage() {
    return this.pubSub.asyncIterator('New-Message');
  }
}
