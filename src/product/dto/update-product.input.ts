import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String)
  id: string;

  @Field(() => String, { description: 'Product name', nullable: true  })
  name: string;

  @Field(() => Float, { description: 'Product price', nullable: true  })
  price: number;
 
  @Field(() => String, { description: 'Product description', nullable: true   })
  description: string;
  
  @Field(() => [GraphQLUpload], { description: 'Product\'s images' , nullable: true  })
  images

  @Field(() => String, { description: 'Product\'s categroy' , nullable: true })
  category: string

  @Field(() => String , { nullable: true })
  size

  @Field(() => Int , { nullable: true } )
  quantity

  @Field(() => Float , { nullable: true }  )
  weight

  @Field(() => String , { nullable: true })
  material

  @Field(() => [Int] , { nullable: true })
  deletedImages

}
