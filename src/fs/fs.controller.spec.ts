import { Test, TestingModule } from '@nestjs/testing';
import { FsController } from './fs.controller';

describe('FsController', () => {
  let controller: FsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FsController],
    }).compile();

    controller = module.get<FsController>(FsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
