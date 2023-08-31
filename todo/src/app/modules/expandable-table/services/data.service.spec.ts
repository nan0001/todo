import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { DataInterface } from '../models/data.model';
import { of } from 'rxjs';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('TodoService', {
            get: of<DataInterface[]>([]),
          }),
        },
      ],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
