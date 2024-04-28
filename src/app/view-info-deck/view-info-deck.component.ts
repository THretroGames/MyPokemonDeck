import { Component } from '@angular/core';
import { DecksService } from '../_services/decks.service';

@Component({
  selector: 'app-view-info-deck',
  templateUrl: './view-info-deck.component.html',
  styleUrls: ['./view-info-deck.component.css'],
})
export class ViewInfoDeckComponent {
  constructor(public decks: DecksService) {}

  public back(): void {
    this.decks.setStateDeckList();
  }
}
