import { TestBed } from '@angular/core/testing';

import { UploadSongService } from './upload-song.service';

describe('UploadSongService', () => {
  let service: UploadSongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadSongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
