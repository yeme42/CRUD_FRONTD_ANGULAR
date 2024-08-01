import { TestBed } from '@angular/core/testing';

import { ServiceClient } from './service.service';

describe('ServiceService', () => {
  let service: ServiceClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
