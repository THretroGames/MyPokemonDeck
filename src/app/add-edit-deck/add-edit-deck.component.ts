import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Deck } from '../_models/deck';
import { DecksService } from '../_services/decks.service';
import {
  IgxGridComponent,
  IgxToastComponent,
  VerticalAlignment,
} from 'igniteui-angular';
import { AppState } from '../_models/app-state';

@Component({
  selector: 'app-add-edit-deck',
  templateUrl: './add-edit-deck.component.html',
  styleUrls: ['./add-edit-deck.component.css'],
})
export class AddEditDeckComponent implements OnInit, OnChanges {
  @ViewChild('toast', { read: IgxToastComponent })
  public toast: IgxToastComponent;
  @ViewChild('cardGrid')
  public grid: IgxGridComponent;

  constructor(public decks: DecksService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.grid.markForCheck();
  }

  ngOnInit(): void {
    if (this.decks.deck == null) {
      this.decks.deck = new Deck();
      this.decks.deck.cards = [];
    }
  }

  addCard(): void {
    this.decks.setStateAddCard();
  }

  removeCard(id: string): void {
    console.log(id);
    const index = this.decks.deck.cards.findIndex((x) => x.id == id);
    console.log('index ' + index);
    const result = this.decks.decks.filter((d) => d.name == 'lala');
    if (index >= 0) {
      this.decks.deck.cards.splice(index, 1);
      this.grid.markForCheck();
    }
  }

  saveDeck(): void {
    if (this.canAddDeck()) {
      console.log('Save Deck' + this.decks.newDeckName);
      if (this.decks.isStateAddDeck()) {
        console.log('Save Deck' + this.decks.newDeckName);
        this.decks.addDeck(this.decks.newDeckName);
      } else {
        console.log('Edit Deck' + this.decks.newDeckName);
        this.decks.editDeck(this.decks.newDeckName);
      }
      this.decks.setStateDeckList();
    }
  }

  canAddDeck(): boolean {
    if (this.decks.newDeckName == '') {
      this.displayMsg('Nome do Deck não pode estar vazio');
      return false;
    }
    const index = this.decks.decks.findIndex(
      (d) => d.name == this.decks.newDeckName
    );
    if (this.decks.isStateAddDeck()) {
      if (index >= 0) {
        this.displayMsg('Nome do Deck já existe');
        return false;
      }
    }
    if (this.decks.isStateEditDeck()) {
      if (index >= 0 && index != this.decks.editDeckIndex) {
        this.displayMsg('Nome do Deck já existe');
        return false;
      }
    }
    //tem que ter o mínimo de carta
    //tem q ter menos q o máximo de carta
    return true;
  }

  displayMsg(msg: string) {
    this.toast.positionSettings.verticalDirection = VerticalAlignment.Top;
    this.toast.open(msg);
  }
}
