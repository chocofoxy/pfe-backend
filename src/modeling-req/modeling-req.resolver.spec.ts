import { Test, TestingModule } from '@nestjs/testing';
import { ModelingReqResolver } from './modeling-req.resolver';
import { ModelingReqService } from './modeling-req.service';

describe('ModelingReqResolver', () => {
  let resolver: ModelingReqResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelingReqResolver, ModelingReqService],
    }).compile();

    resolver = module.get<ModelingReqResolver>(ModelingReqResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
