import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Stat {
  @Field(() => Int)
  totalOrders: number;

  @Field(() => Int)
  totalProducts: number;

  @Field(() => Int)
  totalReviews: number;

  @Field(() => Int)
  totalClients: number;

  @Field(() => Int)
  totalStores: number;
}
