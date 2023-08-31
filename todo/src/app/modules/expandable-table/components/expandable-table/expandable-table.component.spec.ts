import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableTableComponent } from './expandable-table.component';
import { of } from 'rxjs';
import { DataInterface } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';

describe('ExpandableTableComponent', () => {
  let component: ExpandableTableComponent;
  let fixture: ComponentFixture<ExpandableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ExpandableTableComponent, CustomInputComponent],
      providers: [
        {
          provide: DataService,
          useValue: jasmine.createSpyObj('DataService', {
            getData: of<DataInterface[]>([]),
          }),
        },
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => CustomInputComponent),
          multi: true,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpandableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
