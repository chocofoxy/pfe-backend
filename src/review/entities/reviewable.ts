import { Field } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { Review } from "./review.entity";

export class Reviewable extends Document {
    @Field(() => [Review], { description: "Reviews"})
    @Prop({ type: [{ type: Types.ObjectId , ref: () => Review }]})
    reviews: Review[]
}