import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class File {

    @Field(() => String)
    originalName: string;
  
    @Field(() => String)
    filename: string;

    @Field(() => String)
    path: string;

    @Field(() => String)
    url: string;
}