import { Test, TestingModule } from '@nestjs/testing';
import { PortainerGateway } from './portainer.gateway';

describe('PortainerGateway', () => {
  let gateway: PortainerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortainerGateway],
    }).compile();

    gateway = module.get<PortainerGateway>(PortainerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
