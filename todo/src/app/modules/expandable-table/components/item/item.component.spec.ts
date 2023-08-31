import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = {
      singer: 'test',
      album: 'test',
      img: 'test',
      songs: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
