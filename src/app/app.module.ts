import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ClipboardService} from './clipboard/clipboard.service';
import {ItemScanner} from "./domain/item-scanner";
import {ConditionService} from "./condition-service/condition.service";
import {ElectronService, NgxElectronModule} from "ngx-electron";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxElectronModule
    ],
    providers: [ClipboardService, ItemScanner, ConditionService, ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
