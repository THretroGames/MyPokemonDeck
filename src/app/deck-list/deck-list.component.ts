import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DecksService } from '../_services/decks.service';
import { IgxGridComponent } from 'igniteui-angular';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css'],
})
export class DeckListComponent implements OnInit, OnChanges {
  @ViewChild('deckGrid')
  public grid: IgxGridComponent;

  constructor(public decks: DecksService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
    this.grid.markForCheck();
  }

  ngOnInit(): void {
    console.log('init');
  }

  newDeck(): void {
    this.decks.setNewDeck();
  }

  editDeck(name: string): void {
    this.decks.setEditDeck(name);
  }
}
