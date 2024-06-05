import { TestBed } from '@angular/core/testing';

import { SongListService } from './song-list-service';

describe('SongListServiceService', () => {
  let service: SongListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
