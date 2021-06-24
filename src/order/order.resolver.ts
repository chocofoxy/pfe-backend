import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Roles } from 'src/guards/roles.decorator';
import { CurrentUser } from 'src/guards/current-user.decorator';
import { Role } from 'src/enums';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/jwt-auth.guard';
import { PubSub } from 'apollo-server-express';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService, @Inject('PUB_SUB') private pubSub: PubSub) { }

  //@UseGuards(GqlAuthGuard)
  @Roles('Client')
  @Mutation(() => Order)
  async createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput, @CurrentUser() user) {
    const order = await this.orderService.create({ ...createOrderInput, client: user.id } as CreateOrderInput);
    return order
  }

  @Roles('Admin')
  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.orderService.findAll();
  }

  @Roles('Admin', 'Store', 'Client')
  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.orderService.findOne(id);
  }

  @Roles('Admin')
  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @Roles('Admin')
  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => String }) id: string) {
    return this.orderService.remove(id);
  }

  @Roles(Role.client, Role.store)
  @Query(() => [Order], { name: 'myOrders' })
  myOrders(@CurrentUser() user) {
    return this.orderService.usersOrders(user.id);
  }

  @Roles(Role.client, Role.store)
  @Mutation(() => Order, { name: 'cancelOrder' })
  async cancelOrder(@Args('id', { type: () => String }) id: string, @CurrentUser() user) {
    const order = await this.orderService.cancelOrder(id, user.id);
    return order
  }

  @Roles(Role.store)
  @Mutation(() => Order, { name: 'approveOrder' })
  async approveOrder(@Args('id', { type: () => String }) id: string, @CurrentUser() user) {
    const order = await this.orderService.approveOrder(id, user.id);
    return order
  }

}
