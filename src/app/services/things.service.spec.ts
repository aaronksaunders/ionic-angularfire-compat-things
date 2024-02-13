import { TestBed } from '@angular/core/testing';

import { ThingsService } from './things.service';

describe('ThingsService', () => {
  let service: ThingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
