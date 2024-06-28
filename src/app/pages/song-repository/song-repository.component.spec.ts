import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongRepositoryComponent } from './song-repository.component';

describe('SongRepositoryComponent', () => {
  let component: SongRepositoryComponent;
  let fixture: ComponentFixture<SongRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongRepositoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
