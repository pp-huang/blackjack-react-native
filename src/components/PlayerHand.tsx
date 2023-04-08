import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import { Card as CardType } from '../types/deckTypes';

interface HandProps {
    cards: CardType[];
    removeCard: (index: number) => void;
}

const PlayerHand: React.FC<HandProps> = ({ cards, removeCard }) => {
    const cardOffset = -35; // Horizontal offset between cards
    const totalOffset = (cards.length - 1) * cardOffset + 90; // Plus width of the card including padding and margin
    const startingLeft = (totalOffset / 2) * -1;

    return (
        <View style={styles.handContainer}>
            {cards.map((card, index) => (
                <View key={`PlayerHand-${index}`} style={[styles.cardContainer]}>
                    <Card
                        key={`PlayerHand-Card-${index}`}
                        card={card}
                        id={`PlayerHand-Card-${index}`}
                        style={{
                            right: startingLeft + index * cardOffset,
                            position: 'absolute',
                        }}
                        onPress={() => removeCard(index)}
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
        marginBottom: 20 + 100, // Plus height of card
    },
});

export default PlayerHand;
