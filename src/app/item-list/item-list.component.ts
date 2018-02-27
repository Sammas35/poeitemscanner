import {Component, OnInit} from '@angular/core';
import {ItemScanner} from "../domain/item-scanner";
import {Item} from "../domain/item";
import {ConditionService} from "../condition-service/condition.service";
import {ClipboardService} from "../clipboard/clipboard.service";

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

    itemScanner: ItemScanner;
    itemList: Item[] = [];

    constructor(private clipboardService: ClipboardService, conditionService: ConditionService) {
        this.itemScanner = new ItemScanner();
    }

    ngOnInit(): void {
        this.clipboardService.getChanges()
            .distinct()
            .map(text => Item.createFromString(text))
            .filter(item => item !== null)
            .filter(item => this.itemScanner.scanItem(item))
            .subscribe((item) => {
                this.itemList.push(item);
            });
    }

}
