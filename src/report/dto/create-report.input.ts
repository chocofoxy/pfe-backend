import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReportInput {
  @Field(() => String, { description: 'Reported Email' })
  reported: string;

  @Field(() => String, { description: 'Reporting reason' })
  reason: string;
}
