import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  IgxButtonModule,
  IgxIconModule,
  IgxRippleModule,
  IgxGridModule,
  IgxAvatarModule,
  IgxProgressBarModule,
  IgxInputGroupModule,
  IgxToastModule,
} from 'igniteui-angular';
import { HttpClientModule } from '@angular/common/http';
import { DeckListComponent } from './deck-list/deck-list.component';
import { CardListComponent } from './card-list/card-list.component';
import { AddEditDeckComponent } from './add-edit-deck/add-edit-deck.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckListComponent,
    CardListComponent,
    AddEditDeckComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    IgxButtonModule,
    IgxIconModule,
    IgxRippleModule,
    IgxGridModule,
    IgxAvatarModule,
    IgxProgressBarModule,
    IgxInputGroupModule,
    IgxToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
