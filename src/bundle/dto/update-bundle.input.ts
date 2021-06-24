import { CreateBundleInput } from './create-bundle.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateBundleInput  {
  
  @Field(() => String, { description: 'Id of the bundle' })
  id: string

  @Field(() => String, { description: 'title of the bundle' , nullable: true })
  title: string

  @Field(() => Float, { description: 'Price of the bundle' , nullable: true })
  price: Number
}
