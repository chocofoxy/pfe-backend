import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { Roles } from 'src/guards/roles.decorator';
import { UseInterceptors } from '@nestjs/common';
import { GraphqlFiles } from 'src/storage/file.interceptor';
import { save } from 'src/storage/storage';
import { Public } from 'src/guards/public.decorator';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Roles('Store','Admin')
  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput, @CurrentUser() user ) {
    createProductInput.images.map((file) => save(file).then( (f) => file = f ))
    return this.productService.create({...createProductInput , store: user.id} as CreateProductInput );
  }

  @Public()
  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productService.findOne(id);
  }

  @Roles('Store','Admin')
  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productService.update(updateProductInput.id, updateProductInput);
  }

  @Roles('Store','Admin')
  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.remove(id);
  }
}
