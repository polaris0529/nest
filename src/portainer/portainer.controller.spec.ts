import { Test, TestingModule } from '@nestjs/testing';
import { PortainerController } from './portainer.controller';
import { PortainerService } from './portainer.service';

describe('PortainerController', () => {
  let controller: PortainerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortainerController],
      providers: [PortainerService],
    }).compile();

    controller = module.get<PortainerController>(PortainerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
