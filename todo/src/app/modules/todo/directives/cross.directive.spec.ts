import { CrossDirective } from './cross.directive';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('CrossDirective', () => {
  let mockElemRef: ElementRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ElementRef,
          useValue: jasmine.createSpyObj('ElementRef', {
            nativeElement: {},
          }),
        },
      ],
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = new CrossDirective(mockElemRef);
    expect(directive).toBeTruthy();
  });
});
