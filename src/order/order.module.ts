import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { ProductModule } from 'src/product/product.module';
import { ClientModule } from 'src/client/client.module';
import { StoreModule } from 'src/store/store.module';
import { BundleModule } from 'src/bundle/bundle.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    forwardRef(() => ProductModule ),
    forwardRef(() => ClientModule ),
    forwardRef(() => StoreModule ),
    forwardRef(() => BundleModule ),
    forwardRef(() => NotificationModule ),
  ],
  providers: [OrderResolver, OrderService],
  exports: [OrderService]
})
export class OrderModule {}
