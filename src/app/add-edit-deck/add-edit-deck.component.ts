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

  private minCardCount = 24;
  private maxCardCount = 60;

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
    const index = this.decks.deck.cards.findIndex((x) => x.id == id);
    if (index >= 0) {
      const card = this.decks.deck.cards[index];
      if (card.isPokemon) {
        this.decks.deck.pokemonCount--;
      }
      if (card.isTrainer) {
        this.decks.deck.trainerCount--;
      }
      if (card.types != null) {
        card.types.forEach((t) => {
          let index = this.decks.deck.types.findIndex((x) => x == t);
          if (index >= 0) {
            this.decks.deck.types.splice(index, 1);
          }
          index = this.decks.deck.types.findIndex((x) => x == t);
          if (index < 0) {
            this.decks.deck.typeCount--;
          }
        });
      }
      this.decks.deck.cards.splice(index, 1);
      this.grid.markForCheck();
    }
  }

  saveDeck(): void {
    if (this.canAddDeck()) {
      if (this.decks.isStateAddDeck()) {
        this.decks.addDeck(this.decks.newDeckName);
      } else {
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
    if (this.decks.deck.cards.length < this.minCardCount) {
      this.displayMsg(
        'O Deck deve ter no mínimo ' + this.minCardCount + ' cartas'
      );
      return false;
    }
    if (this.decks.deck.cards.length > this.maxCardCount) {
      this.displayMsg(
        'O Deck deve ter no máximo ' + this.maxCardCount + ' cartas'
      );
      return false;
    }
    return true;
  }

  public onDialogOKSelected(event) {
    this.decks.setStateDeckList();
    event.dialog.close();
  }

  displayMsg(msg: string) {
    this.toast.positionSettings.verticalDirection = VerticalAlignment.Top;
    this.toast.open(msg);
  }
}
