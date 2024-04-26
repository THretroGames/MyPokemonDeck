import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-pokemon-deck';
  data: any;

  styles = {
    fontWeight: 'bold',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://api.pokemontcg.io/v2/cards?q=name:pikachu')
      .subscribe((resultado) => (this.data = resultado.data)),
      (erro) => console.log('Erro ao procurar Pokémon.');
  }
}
