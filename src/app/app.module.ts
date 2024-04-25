import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  IgxButtonModule,
  IgxIconModule,
  IgxRippleModule,
} from 'igniteui-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IgxButtonModule,
    IgxIconModule,
    IgxRippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
