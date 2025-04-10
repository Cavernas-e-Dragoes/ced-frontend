import { TestBed } from '@angular/core/testing';

import { SaudacaoMedievalService } from './saudacao-medieval.service';

describe('SaudacaoMedievalService', () => {
  let service: SaudacaoMedievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaudacaoMedievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
