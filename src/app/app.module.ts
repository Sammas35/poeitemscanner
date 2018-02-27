import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ClipboardService} from './clipboard/clipboard.service';
import {ItemScanner} from "./domain/item-scanner";
import {ConditionService} from "./condition-service/condition.service";
import {ElectronService, NgxElectronModule} from "ngx-electron";
import { SearchConfigComponent } from './search-config/search-config.component';
import { ItemListComponent } from './item-list/item-list.component';
import {AppRoutingModule} from "./routing/app-routing-module";


@NgModule({
    declarations: [
        AppComponent,
        SearchConfigComponent,
        ItemListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxElectronModule
    ],
    providers: [ClipboardService, ItemScanner, ConditionService, ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
