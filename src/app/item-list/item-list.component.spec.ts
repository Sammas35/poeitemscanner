import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemListComponent} from './item-list.component';
import {ClipboardService} from "../clipboard/clipboard.service";
import {ElectronService} from "ngx-electron";
import {ConditionService} from "../condition-service/condition.service";

describe('ItemListComponent', () => {
    let component: ItemListComponent;
    let fixture: ComponentFixture<ItemListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemListComponent],
            providers: [
                ClipboardService,
                ElectronService,
                ConditionService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
