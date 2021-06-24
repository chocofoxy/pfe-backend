import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class MessageConversationInput {
  
  @Field(() => String)
  to: String;

  @Field(() => String)
  message: string
  
}
