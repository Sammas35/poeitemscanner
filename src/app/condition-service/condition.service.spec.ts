import { TestBed, inject } from '@angular/core/testing';

import { ConditionService } from './condition.service';
import {ElectronService} from "ngx-electron";

describe('ConditionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConditionService, ElectronService]
    });
  });

  it('should be created', inject([ConditionService], (service: ConditionService) => {
    expect(service).toBeTruthy();
  }));
});
