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
    this.grid.markForCheck();
  }

  addDeck(id: string): void {
    console.log(id);
    this.decks.addDeck(id);
    this.grid.markForCheck();
    const result = this.decks.decks.filter((d) => d.name == 'lala');
    console.log(result.length);
  }
}
