import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { Roles } from 'src/guards/roles.decorator';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { Public } from 'src/guards/public.decorator';
import { Role } from 'src/enums';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Roles(Role.client)
  @Mutation(() => Review)
  createReview(@Args('createReviewInput') createReviewInput: CreateReviewInput, @CurrentUser() user ) { 
    return this.reviewService.create({...createReviewInput, client: user.id } as CreateReviewInput);
  }

  @Roles(Role.admin)
  @Query(() => [Review], { name: 'reviews' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Public()
  @Query(() => Review, { name: 'review' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reviewService.findOne(id);
  }

  @Roles(Role.client)
  @Mutation(() => Review)
  updateReview(@Args('updateReviewInput') updateReviewInput: UpdateReviewInput) {
    return this.reviewService.update(updateReviewInput.id, updateReviewInput);
  }

  @Roles(Role.client)
  @Mutation(() => Review)
  removeReview(@Args('id', { type: () => String }) id: string) {
    return this.reviewService.remove(id);
  }
}
