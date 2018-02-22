import {inject, TestBed} from '@angular/core/testing';

import {ClipboardService} from './clipboard.service';
import {ElectronService} from "ngx-electron";

describe('ClipboardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ClipboardService, ElectronService]
        });
    });

    it('should be created', inject([ClipboardService], (service: ClipboardService) => {
        expect(service).toBeTruthy();
    }));
});
