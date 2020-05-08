import { TestBed } from '@angular/core/testing';

import { ApiCommunicatorService } from './api-communicator.service';

describe('ApiCommunicatorService', () => {
  let service: ApiCommunicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
