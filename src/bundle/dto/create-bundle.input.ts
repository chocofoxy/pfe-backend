import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateBundleInput {
  @Field(() => String, { description: 'title of the bundle' })
  title: string

  @Field(() => [String], { description: 'Array of bundle\'s products' })
  products: String[]

  @Field(() => Float, { description: 'Price of the bundle' })
  price: Number
}
