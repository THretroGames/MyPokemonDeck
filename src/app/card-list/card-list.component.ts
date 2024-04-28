import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DecksService } from '../_services/decks.service';
import { IgxToastComponent, VerticalAlignment } from 'igniteui-angular';
import { Card } from '../_models/card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent {
  @ViewChild('toast', { read: IgxToastComponent })
  public toast: IgxToastComponent;

  cardName = '';
  isLoading = false;
  cards: any;

  styles = {
    fontWeight: 'bold',
  };

  constructor(private http: HttpClient, public decks: DecksService) {}

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
          this.isLoading = false;
        }
      );
  }

  back(): void {
    this.decks.state = this.decks.previousState;
  }

  addCard(
    id: string,
    name: string,
    set: string,
    imageUrl: string,
    superType: string,
    types: string[]
  ): void {
    if (this.canAddCard(name)) {
      const card = new Card();
      card.id = id;
      card.name = name;
      card.set = set;
      card.imageUrl = imageUrl;
      if (superType == 'Pokémon') {
        this.decks.deck.pokemonCount++;
      }
      if (superType == 'Trainer') {
        this.decks.deck.trainerCount++;
      }
      if (types != null) {
        types.forEach((t) => {
          const index = this.decks.deck.types.findIndex((x) => x == t);
          if (index < 0) {
            this.decks.deck.types.push(t);
          }
        });
      }
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

  public onDialogOKSelected(event) {
    this.decks.setStateDeckList();
    event.dialog.close();
  }

  displayMsg(msg: string) {
    this.toast.positionSettings.verticalDirection = VerticalAlignment.Top;
    this.toast.open(msg);
  }
}
