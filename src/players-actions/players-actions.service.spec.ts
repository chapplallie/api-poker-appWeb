import { Test, TestingModule } from '@nestjs/testing';
import { PlayersActionsService } from './players-actions.service';

describe('PlayersActionsService', () => {
  let service: PlayersActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersActionsService],
    }).compile();

    service = module.get<PlayersActionsService>(PlayersActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
