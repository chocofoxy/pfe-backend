import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {

  @Field(() => Int, { description: 'Review\'s rating' })
  rating: number

  @Field(() => String, { description: 'Review\'s feedback id' })
  feedback: string
  
  @Field(() => String , { description: 'Reviewable Id' })
  reviewingId: string
}
