import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DecksService } from '../_services/decks.service';
import { IgxToastComponent, VerticalAlignment } from 'igniteui-angular';
import { Card } from '../_models/card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  @ViewChild('toast', { read: IgxToastComponent })
  public toast: IgxToastComponent;

  cardName = '';
  isLoading = false;
  cards: any;

  styles = {
    fontWeight: 'bold',
  };

  constructor(private http: HttpClient, public decks: DecksService) {}

  ngOnInit(): void {}

  addTest(id: string): void {
    console.log(id);
    this.decks.addTest(id);
  }

  searchCard(): void {
    if (this.cardName == '') {
      this.displayMsg('Nome da Carta não pode estar vazio');
      return;
    }
    this.isLoading = true;
    this.http
      .get<any>('https://api.pokemontcg.io/v2/cards?q=name:' + this.cardName)
      .subscribe(
        (resultado) => {
          this.cards = resultado.data;
          this.isLoading = false;
        },
        (erro) => {
          console.log('Erro ao procurar Pokémon.');
          this.isLoading = false;
        }
      );
  }

  back(): void {
    this.decks.state = 'deckList';
  }

  addCard(id: string, name: string, set: string, imageUrl: string): void {
    console.log(id);
    const card = new Card();
    card.id = id;
    card.name = name;
    card.set = set;
    card.imageUrl = imageUrl;
    this.decks.deck.cards.push(card);
  }

  displayMsg(msg: string) {
    this.toast.positionSettings.verticalDirection = VerticalAlignment.Top;
    this.toast.open(msg);
  }
}
