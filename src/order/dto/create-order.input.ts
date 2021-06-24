import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  
  @Field(() => String)
  product: string

  @Field(() => String ,{ nullable: null , defaultValue: null})
  material

  @Field(() => Int ,{ defaultValue: 1 })
  quantity

}
