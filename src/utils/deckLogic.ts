import { Card, Deck, Suit } from '../types/deckTypes';
import { values } from '../constants/deckConstants';

function createDeck() {
    const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
    const deck: Deck = [];

    for (const suit of suits) {
        for (const value of values) {
            deck.push({ value: value, suit: suit });
        }
    }
    return deck;
}

function shuffleDeck(deck: Deck) {
    console.log('shuffle');

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawCard(deck: Deck) {
    return deck.pop();
}

function drawSpecificCard(deck: Deck, selectedValue: string | number) {
    const cardIndex = deck.findIndex((card: Card) => card.value === selectedValue);
    if (cardIndex !== -1) {
        const selectedCard = deck[cardIndex];
        deck.splice(cardIndex, 1);
        return selectedCard;
    } else {
        console.error(`No card with value ${selectedValue} found in the deck.`);
        return null;
    }
}

export { createDeck, shuffleDeck, drawSpecificCard, drawCard };
