import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import {GrowlModule} from 'primeng/growl';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GrowlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
