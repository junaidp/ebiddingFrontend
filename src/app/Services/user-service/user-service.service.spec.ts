import { TestBed } from '@angular/core/testing';
import { Userervice } from './user-service.service';

describe('Userervice', () => {
  let service: Userervice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userervice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
