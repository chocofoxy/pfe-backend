import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class UpdateCategoryInput {

    @Field(() => String)
    id: string

    @Field(() => String)
    name: string

    @Field(() => String)
    description: string


    @Field(() => GraphQLUpload, { nullable: true })
    image;

    @Field(() => GraphQLUpload, { nullable: true })
    icon;
}
