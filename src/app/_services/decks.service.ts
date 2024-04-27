import { Injectable } from '@angular/core';
import { Deck } from '../_models/deck';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  public test: string[] = [];
  public decks: Deck[] = [];
  public deck: Deck;
  public state: string = 'deckList';

  constructor() {}

  public addTest(test: string) {
    this.test.push(test);
  }

  public addDeck(test: string) {
    let deck: Deck = new Deck();
    deck.name = test;
    deck.cards = [];
    this.decks.push(deck);
  }
}
