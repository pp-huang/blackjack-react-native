import { Card } from '../types/deckTypes';
import { Action, Bust } from '../types/gameTypes';

function isSoft(hand: Card[]): boolean {
    return hand.some((card) => card.value === 'A');
}

function handValue(hand: Card[]): number {
    let value = 0;
    let aces = 0;

    for (const card of hand) {
        if (card.value === 'A') {
            value += 11;
            aces++;
        } else if (typeof card.value === 'string') {
            value += 10;
        } else {
            value += card.value;
        }
    }

    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }

    return value;
}

function valueToCard(value: number | string): Card {
    return { value, suit: 'hearts' }; // Use 'hearts' as the default suit
}

export function blackjackDecision(userHand: Card[], dealerUpCard: Card): Action | Bust {
    const value = handValue(userHand);
    const soft = isSoft(userHand);
    const pair = userHand.length === 2 && userHand[0].value === userHand[1].value;

    const dealerValue = typeof dealerUpCard.value === 'string' ? 10 : dealerUpCard.value;

    if (value > 21) {
        return 'bust';
    }

    if (pair) {
        const cardValue = userHand[0].value;
        if (cardValue === 'A' || cardValue === 8) {
            return 'split';
        } else if (
            cardValue === 9 &&
            (dealerValue <= 6 || dealerValue === 8 || dealerValue === 9)
        ) {
            return 'split';
        } else if ((cardValue === 7 || cardValue === 3) && dealerValue <= 7) {
            return 'split';
        } else if (cardValue === 6 && dealerValue <= 6) {
            return 'split';
        } else if (cardValue === 4 && (dealerValue === 5 || dealerValue === 6)) {
            return 'split';
        } else if (cardValue === 2 && dealerValue <= 7) {
            return 'split';
        } else {
            return blackjackDecision([value].map(valueToCard), dealerUpCard); // Use regular strategy for non-split pairs.
        }
    }

    if (soft) {
        if (value === 19 && dealerValue === 6) {
            return 'double';
        } else if (value === 18 && dealerValue >= 3 && dealerValue <= 6) {
            return 'double';
        } else if (value >= 17) {
            return 'stand';
        } else if (value === 16 && dealerValue >= 4 && dealerValue <= 6) {
            return 'double';
        } else if (value === 15 && dealerValue >= 4 && dealerValue <= 6) {
            return 'double';
        } else if ((value === 14 && dealerValue === 5) || dealerValue === 6) {
            return 'double';
        } else if ((value === 13 && dealerValue === 5) || dealerValue === 6) {
            return 'double';
        } else {
            return 'hit';
        }
    }

    if (value >= 17) {
        return 'stand';
    } else if (value === 16 && dealerValue <= 6) {
        return 'stand';
    } else if (value === 15 && dealerValue <= 6) {
        return 'stand';
    } else if (value === 13 || value === 14) {
        return dealerValue >= 2 && dealerValue <= 6 ? 'stand' : 'hit';
    } else if (value === 12) {
        return dealerValue >= 4 && dealerValue <= 6 ? 'stand' : 'hit';
    } else if (value === 11) {
        return 'double';
    } else if (value === 10 && dealerValue <= 9) {
        return 'double';
    } else if (value === 9 && dealerValue >= 3 && dealerValue <= 6) {
        return 'double';
    } else {
        return 'hit';
    }
}
