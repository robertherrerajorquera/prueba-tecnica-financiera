import { TestBed } from '@angular/core/testing';

import { UsoApiService } from './uso-api.service';

describe('UsoApiService', () => {
  let service: UsoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
