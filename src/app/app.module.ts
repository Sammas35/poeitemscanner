import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {ClipboardService} from './clipboard/clipboard.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ClipboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
