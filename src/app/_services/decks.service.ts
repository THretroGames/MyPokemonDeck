import { Injectable } from '@angular/core';
import { Deck } from '../_models/deck';
import { AppState } from '../_models/app-state';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  public decks: Deck[] = [];
  public deck: Deck;
  public previousState: AppState = AppState.DeckList;
  public state: AppState = AppState.DeckList;
  public newDeckName = '';
  public editDeckIndex = -1;

  constructor() {}

  public setNewDeck() {
    this.newDeckName = '';
    this.editDeckIndex = -1;
    this.deck = new Deck();
    this.deck.cards = [];
    this.setStateAddDeck();
  }

  public setEditDeck(name: string) {
    const index = this.decks.findIndex((d) => d.name == name);
    if (index >= 0) {
      this.editDeckIndex = index;
      this.deck = this.decks[index];
      this.newDeckName = this.deck.name;
      this.setStateEditDeck();
    }
  }

  public setViewInfoDeck(name: string) {
    const index = this.decks.findIndex((d) => d.name == name);
    if (index >= 0) {
      this.deck = this.decks[index];
      this.setStateViewInfoDeck();
    }
  }

  public addDeck(deckName: string) {
    this.deck.name = deckName;
    this.decks.push(this.deck);
  }

  public editDeck(deckName: string) {
    this.deck.name = deckName;
  }

  public setStateDeckList(): void {
    this.previousState = this.state;
    this.state = AppState.DeckList;
  }

  public setStateAddDeck(): void {
    this.previousState = this.state;
    this.state = AppState.AddDeck;
  }

  public setStateAddCard(): void {
    this.previousState = this.state;
    this.state = AppState.AddCard;
  }

  public setStateEditDeck(): void {
    this.previousState = this.state;
    this.state = AppState.EditDeck;
  }

  public setStateViewInfoDeck(): void {
    this.previousState = this.state;
    this.state = AppState.ViewInfoDeck;
  }

  public isStateDeckList(): boolean {
    return this.state == AppState.DeckList;
  }

  public isStateAddDeck(): boolean {
    return this.state == AppState.AddDeck;
  }

  public isStateAddCard(): boolean {
    return this.state == AppState.AddCard;
  }

  public isStateEditDeck(): boolean {
    return this.state == AppState.EditDeck;
  }

  public isStateViewInfoDeck(): boolean {
    return this.state == AppState.ViewInfoDeck;
  }
}
