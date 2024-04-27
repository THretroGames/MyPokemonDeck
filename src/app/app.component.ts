import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DecksService } from './_services/decks.service';
import { AppState } from './_models/app-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Meu Deck Pokémon';
  data: any;

  styles = {
    fontWeight: 'bold',
  };

  constructor(private http: HttpClient, public decks: DecksService) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://api.pokemontcg.io/v2/cards?q=name:pikachu')
      .subscribe((resultado) => (this.data = resultado.data)),
      (erro) => console.log('Erro ao procurar Pokémon.');
  }

  addTest(id: string): void {
    console.log(id);
    this.decks.addTest(id);
  }

  isOnDeckListState(): boolean {
    if (this.decks.state == AppState.DeckList) {
      return true;
    }
    return false;
  }

  isOnAddEditState(): boolean {
    if (
      this.decks.state == AppState.AddDeck ||
      this.decks.state == AppState.EditDeck
    ) {
      return true;
    }
    return false;
  }

  isOnAddCardState(): boolean {
    if (this.decks.state == AppState.AddCard) {
      return true;
    }
    return false;
  }
}
