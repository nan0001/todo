import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumNameComponent } from './album-name.component';

describe('AlbumNameComponent', () => {
  let component: AlbumNameComponent;
  let fixture: ComponentFixture<AlbumNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
