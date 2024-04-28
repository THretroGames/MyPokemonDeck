import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DecksService } from '../_services/decks.service';
import { IgxGridComponent } from 'igniteui-angular';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css'],
})
export class DeckListComponent implements OnChanges {
  @ViewChild('deckGrid')
  public grid: IgxGridComponent;
  private deleteDeckName = '';

  constructor(public decks: DecksService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.grid.markForCheck();
  }

  newDeck(): void {
    this.decks.setNewDeck();
  }

  editDeck(name: string): void {
    this.decks.setEditDeck(name);
  }

  viewInfoDeck(name: string): void {
    this.decks.setViewInfoDeck(name);
  }

  public onDialogOKSelected(event): void {
    if (this.deleteDeckName != '') {
      const index = this.decks.decks.findIndex(
        (x) => x.name == this.deleteDeckName
      );
      if (index >= 0) {
        this.decks.decks.splice(index, 1);
        this.deleteDeckName = '';
        this.grid.markForCheck();
      }
    }
    event.dialog.close();
  }

  public setDeleteDeck(name: string): void {
    this.deleteDeckName = name;
  }
}
