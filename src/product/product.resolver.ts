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
import { SearchProductInput } from './dto/search-product.input';
import { Role } from 'src/enums';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Roles('Store', 'Admin')
  //@UseInterceptors(GraphqlFiles('createProductInput'))
  @Mutation(() => Product)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput, @CurrentUser() user) {
    let images = []
    for (let file of createProductInput.images) {
      images.push(await save(file).then((f) => file = f).catch(e => ''))
    }
    createProductInput.images = images
    return this.productService.create({ ...createProductInput, store: user.id });
  }

  @Public()
  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productService.findAll();
  }

  @Roles(Role.admin)
  @Query(() => [Product], { name: 'allProducts' })
  findAllStatus() {
    return this.productService.findAllStatus();
  }

  @Public()
  @Query(() => Product, { name: 'product', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.productService.findOne(id);
  }

  @Roles('Store')
  @Query(() => Product, { name: 'productForInvetory', nullable: true })
  findOneForInvetory(@Args('id', { type: () => String }) id: string , @CurrentUser() user) {
    return this.productService.findOneForInvetory(id,user.id);
  }

  @Roles(Role.admin)
  @Query(() => Product, { name: 'productForAdmin', nullable: true })
  findOneForAdmin(@Args('id', { type: () => String }) id: string , @CurrentUser() user) {
    return this.productService.findOneAdmin(id);
  }

  @Roles(Role.admin)
  @Mutation(() => Product)
  changeProductStatus(@Args('id', { type: () => String }) id: string , @Args('operation', { type: () => Boolean }) operation: Boolean ) {
    if ( operation )
    return this.productService.approve(id);
    else
    return this.productService.decline(id);
  }

  @Public()
  @Query(() => [Product], { name: 'searchProducts' })
  search(@Args('searchProductInput') searchProductInput: SearchProductInput) {
    return this.productService.search(searchProductInput);
  }

  @Roles('Store', 'Admin')
  @Mutation(() => Product)
  async updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput, @CurrentUser() user ) {
    let images = []
    for (let file of updateProductInput.images) {
      images.push(await save(file).then((f) => file = f).catch(e => ''))
    }
    updateProductInput.images = images
    return this.productService.updateExternal(updateProductInput.id, updateProductInput , user.id);
  }

  @Roles('Store', 'Admin')
  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.remove(id);
  }

  /*@Roles('Store', 'Admin')
  @Mutation(() => Product)
  removeImages(@Args('id', { type: () => String }) id: string ,@Args('ids', { type: () => [Number] }) ids: Number[] , @CurrentUser() user ) {
    return this.productService.removeImages(id, ids , user);
  }*/

  @Roles('Client')
  @Mutation(() => Product)
  addToWatchlist(@Args('id', { type: () => String , nullable: true}) id: string , @CurrentUser() user ) {
    return this.productService.addToWatchlist(id,user.id);
  }

  @Roles('Client')
  @Mutation(() => Product)
  removeFromWatchlist(@Args('id', { type: () => String }) id: string , @CurrentUser() user ) {
    return this.productService.removeFromWatchlist(id,user.id);
  }
  
  @Public()
  @Query(() => [Product], { name: 'bestSelling' })
  bestSelling() {
    return this.productService.bestSelling();
  }
  
}
