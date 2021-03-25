import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@InputType()
export class CreateStoreInput extends CreateUserInput {
}
