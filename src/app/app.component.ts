import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DecksService } from './_services/decks.service';

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
}
