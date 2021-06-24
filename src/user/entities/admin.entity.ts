import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Role } from 'src/enums';
import { User } from './user.entity';

@Schema({ timestamps: true })
@ObjectType()
export class Admin extends User {

    @Field(() => String)
    @Prop({ default: Role.admin , enum: [ Role.admin , Role.moderator ] })
    role: string

    @Field(() => Date )
    createdAt

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
