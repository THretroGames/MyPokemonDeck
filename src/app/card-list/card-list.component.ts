import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DecksService } from '../_services/decks.service';
import { IgxToastComponent, VerticalAlignment } from 'igniteui-angular';
import { Card } from '../_models/card';
import { AppState } from '../_models/app-state';

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
    console.log('this.decks.previousState = ' + this.decks.previousState);
    this.decks.state = this.decks.previousState;
  }

  addCard(id: string, name: string, set: string, imageUrl: string): void {
    console.log(id);
    if (this.canAddCard(name)) {
      const card = new Card();
      card.id = id;
      card.name = name;
      card.set = set;
      card.imageUrl = imageUrl;
      this.decks.deck.cards.push(card);
      this.displayMsg('Carta ' + name + ' adicionada ao Deck.');
    }
  }

  canAddCard(name: string): boolean {
    const result = this.decks.deck.cards.filter((c) => c.name == name);
    if (result.length >= 4) {
      this.displayMsg('O Deck pode ter no máximo 4 cartas com o mesmo nome.');
      return false;
    }
    return true;
  }

  displayMsg(msg: string) {
    this.toast.positionSettings.verticalDirection = VerticalAlignment.Top;
    this.toast.open(msg);
  }
}
