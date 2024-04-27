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

  constructor(public decks: DecksService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.grid.markForCheck();
  }

  ngOnInit(): void {
    //this.grid.markForCheck();
    if (this.decks.deck == null) {
      this.decks.deck = new Deck();
      this.decks.deck.name = 'lala';
      this.decks.deck.cards = [];
    }
  }

  addCard(): void {
    this.decks.state = 'addCard';
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

  addDeck(id: string): void {
    console.log(id);
    this.decks.addDeck(id);
    this.grid.markForCheck();
    const result = this.decks.decks.filter((d) => d.name == 'lala');
    console.log(result.length);
    this.displayMsg('msg lala');
  }

  displayMsg(msg: string) {
    this.toast.positionSettings.verticalDirection = VerticalAlignment.Top;
    this.toast.open(msg);
  }
}
