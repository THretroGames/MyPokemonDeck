import { Card } from './card';

export class Deck {
  name: string = '';
  cards: Card[] = [];
  pokemonCount: number = 0;
  trainerCount: number = 0;
  typeCount: number = 0;
  types: string[] = [];
}
