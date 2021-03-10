import { Test, TestingModule } from '@nestjs/testing';
import { MaterialResolver } from './material.resolver';
import { MaterialService } from './material.service';

describe('MaterialResolver', () => {
  let resolver: MaterialResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialResolver, MaterialService],
    }).compile();

    resolver = module.get<MaterialResolver>(MaterialResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
