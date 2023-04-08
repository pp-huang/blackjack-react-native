export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export type Deck = Card[];

export interface Card {
    value: string | number;
    suit?: Suit;
}
