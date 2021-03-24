import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  
  @Field(() => String)
  product: string

  @Field(() => Int )
  quantity: number

}
