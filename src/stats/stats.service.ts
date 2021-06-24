import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { ReviewService } from 'src/review/review.service';
import { StoreService } from 'src/store/store.service';
import { CreateStatInput } from './dto/create-stat.input';
import { UpdateStatInput } from './dto/update-stat.input';

@Injectable()
export class StatsService {
  
  constructor( 
    private storeService:StoreService,
    private clientService: ClientService,
    private orderService:OrderService,
    private reviewService: ReviewService,
    private productService: ProductService
    ){}


    async adminStats (){
      return {
        totalProducts : await this.productService.count(),
        totalOrders: await this.orderService.count() ,
        totalClients: await this.clientService.count(), 
        totalStores: await this.storeService.count() ,
        totalReviews: await this.reviewService.count() ,
      }
    }



}
