import { forwardRef, Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsResolver } from './stats.resolver';
import { ClientModule } from 'src/client/client.module';
import { OrderModule } from 'src/order/order.module';
import { StoreModule } from 'src/store/store.module';
import { ReviewModule } from 'src/review/review.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    forwardRef(() => ClientModule),
    forwardRef(() => StoreModule),
    forwardRef(() => OrderModule),
    forwardRef(() => ReviewModule),
    forwardRef(() => ProductModule),
  ],
  providers: [StatsResolver, StatsService],
  exports:[StatsService]
})
export class StatsModule {}
