import {RouterModule, Routes} from "@angular/router";
import {SearchConfigComponent} from "../search-config/search-config.component";
import {ItemListComponent} from "../item-list/item-list.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'itemview', component: ItemListComponent },
    { path: 'config',  component: SearchConfigComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
