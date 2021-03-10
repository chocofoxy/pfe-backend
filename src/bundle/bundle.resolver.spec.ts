import { Test, TestingModule } from '@nestjs/testing';
import { BundleResolver } from './bundle.resolver';
import { BundleService } from './bundle.service';

describe('BundleResolver', () => {
  let resolver: BundleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BundleResolver, BundleService],
    }).compile();

    resolver = module.get<BundleResolver>(BundleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
