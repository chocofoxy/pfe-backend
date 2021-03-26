import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class SearchProductInput {
 
  @Field(() => String, { nullable: true, description: 'Query in Product\'s name' })
  name

  @Field(() => Float, { nullable: true, description: 'Product min price' })
  minPrice: number;
 
  @Field(() => Float, { nullable: true, description: 'Product max price' })
  maxPrice: number;

  @Field(() => String, { nullable: true, description: 'Product\'s category' })
  category

}