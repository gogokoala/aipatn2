import { TestBed, inject } from '@angular/core/testing';

import { CniprService } from './cnipr.service';

describe('CniprService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CniprService]
    });
  });

  it('should be created', inject([CniprService], (service: CniprService) => {
    expect(service).toBeTruthy();
  }));
});
