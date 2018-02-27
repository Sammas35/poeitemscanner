import {Component, OnInit} from '@angular/core';
import {ClipboardService} from './clipboard/clipboard.service';
import {Item} from "./domain/item";

import 'rxjs/add/operator/distinct';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import {ItemScanner} from "./domain/item-scanner";
import {ConditionService} from "./condition-service/condition.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}
