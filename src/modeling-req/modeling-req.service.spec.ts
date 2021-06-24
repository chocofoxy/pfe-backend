import { Test, TestingModule } from '@nestjs/testing';
import { ModelingReqService } from './modeling-req.service';

describe('ModelingReqService', () => {
  let service: ModelingReqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelingReqService],
    }).compile();

    service = module.get<ModelingReqService>(ModelingReqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
