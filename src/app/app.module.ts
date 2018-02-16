import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ClipboardService} from './clipboard/clipboard.service';
import {ItemScanner} from "./domain/item-scanner";
import {ConditionService} from "./condition-service/condition.service";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [ClipboardService, ItemScanner, ConditionService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
