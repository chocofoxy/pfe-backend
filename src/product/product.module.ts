import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { Product, ProductSchema } from './entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/category/category.module';
import { UsersModule } from 'src/user/users.module';
import { StoreModule } from 'src/store/store.module';
import { ClientModule } from 'src/client/client.module';
import { OrderModule } from 'src/order/order.module';
import { NotificationModule } from 'src/notification/notification.module';
import { BundleModule } from 'src/bundle/bundle.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    forwardRef(() => CategoryModule),
    forwardRef(() => StoreModule),
    forwardRef(() => OrderModule),
    forwardRef(() => BundleModule),
    forwardRef(() => NotificationModule),
    forwardRef(() => ClientModule)
  ],
  providers: [ProductResolver, ProductService],
  exports: [ProductService]
})
export class ProductModule {}
