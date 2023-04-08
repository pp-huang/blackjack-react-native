import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import { Card as CardType } from '../types/deckTypes';

interface HandProps {
    cards: CardType[];
    removeCard: (index: number, isDealer: boolean) => void;
}

const DealerHand: React.FC<HandProps> = ({ cards, removeCard }) => {
    const cardOffset = -35; // Horizontal offset between cards
    const totalOffset = (cards.length - 1) * cardOffset + 90; // Plus width of the card including padding and margin
    const startingLeft = (totalOffset / 2) * -1;

    return (
        <View style={styles.handContainer}>
            {cards.map((card, index) => (
                <View key={`DealerHand-${index}`} style={styles.cardContainer}>
                    <Card
                        key={`DealerHand-Card-${index}`}
                        card={card}
                        id={`DealerHand-Card-${index}`}
                        style={{
                            right: startingLeft + index * cardOffset,
                            position: 'absolute',
                            top: 0,
                        }}
                        onPress={() => removeCard(index, true)}
                        disabled={card.value === '?'}
                    />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        position: 'absolute',
    },
    handContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
});

export default DealerHand;
