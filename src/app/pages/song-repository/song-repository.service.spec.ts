import { TestBed } from '@angular/core/testing';

import { SongRepositoryService } from './song-repository.service';

describe('SongRepositoryService', () => {
  let service: SongRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
