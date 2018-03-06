import {inject, TestBed} from '@angular/core/testing';

import {MasterdataService} from './masterdata.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('MasterdataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MasterdataService]
        });
    });

    it('should be created', inject([MasterdataService], (service: MasterdataService) => {
        expect(service).toBeTruthy();
    }));

    describe('init', () => {
        it('should load affix-ender', ()=> {
            const masterdataService = TestBed.get(MasterdataService);
            const http = TestBed.get(HttpTestingController);

            const affixEnder = {
                "enders": [
                    "Shaper Item",
                    "Elder Item",
                    "Place into an Abyssal Socket on an Item or into an allocated Jewel Socket on the Passive Skill Tree. Right click to remove from the Socket.",
                    "Note:"
                ]
            };

            masterdataService.init();

            http.expectOne('masterdata/affix-ender.json').flush(affixEnder);

            expect(masterdataService.affixEnder).toBeTruthy();
        });
    });
});
