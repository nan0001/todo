import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesPageComponent } from './tables-page.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('TablesPageComponent', () => {
  let component: TablesPageComponent;
  let fixture: ComponentFixture<TablesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablesPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
