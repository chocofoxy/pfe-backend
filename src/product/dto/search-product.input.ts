import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class SearchProductInput {
 
@Field(() => String, { nullable: true, description: 'Query in Product\'s name'  })
  name

  @Field(() => Float, { nullable: true, description: 'Product min price' , defaultValue: 0.01 })
  minPrice: number;
 
  @Field(() => Float, { nullable: true, description: 'Product max price' , defaultValue: 10000000.01 })
  maxPrice: number;

  @Field(() => String, { nullable: true, description: 'Product\'s category' })
  category

  @Field(() => String, { nullable: true, description: 'Product\'s store' })
  store

}