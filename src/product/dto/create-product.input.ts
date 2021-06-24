import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class CreateProductInput {
 
  @Field(() => String, { description: 'Product name' })
  name: string;

  @Field(() => Float, { description: 'Product price' })
  price: number;
 
  @Field(() => String, { description: 'Product description' })
  description: string;
  
  @Field(() => [GraphQLUpload], { description: 'Product\'s images' })
  images

  @Field(() => String, { description: 'Product\'s categroy' })
  category: string

  @Field(() => String )
  size

  @Field(() => Int , { nullable: true } )
  quantity

  @Field(() => Float  )
  weight

  @Field(() => String )
  material

}
