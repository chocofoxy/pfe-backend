import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {

  @Field(() => Float, { description: 'Review\'s rating' })
  rating

  @Field(() => String, { description: 'Review\'s feedback id' })
  feedback: string
  
  @Field(() => String , { description: 'Reviewable Id' })
  reviewingId: string
}
