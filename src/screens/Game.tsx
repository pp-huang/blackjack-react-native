import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Import custom components
import DealerHand from '../components/DealerHand';
import PlayerHand from '../components/PlayerHand';
import Card from '../components/Card';
// Import custom logic
import { createDeck, drawSpecificCard, shuffleDeck } from '../utils/deckLogic';
import { blackjackDecision } from '../utils/gameLogic';
// Import custom constants and types
import { Card as CardType, Deck } from '../types/deckTypes';
import { Action, Bust } from '../types/gameTypes';
import { values } from '../constants/deckConstants';

const Game = () => {
    const [selectedDealerCard, setSelectedDealerCard] = useState<CardType[]>([{ value: '?' }]);
    const [selectedPlayerCards, setSelectedPlayerCards] = useState<CardType[]>([]);
    const [decision, setDecision] = useState<Action | Bust>();
    const [deck, setDeck] = useState<Deck>([]);

    useEffect(() => {
        setDeck(createDeck());
    }, []);

    useEffect(() => {
        shuffleDeck(deck);
    }, [deck]);

    useEffect(() => {
        if (selectedPlayerCards.length >= 2 && selectedDealerCard[1]) {
            setDecision(blackjackDecision(selectedPlayerCards, selectedDealerCard[1]));
        } else {
            setDecision(undefined);
        }
    }, [selectedPlayerCards, selectedDealerCard]);

    const handleDealerCardSelection = (card: CardType) => {
        let selectedCard = drawSpecificCard(deck, card.value);
        if (selectedCard) setSelectedDealerCard([{ value: '?' }, selectedCard]);
    };

    const handlePlayerCardSelection = (card: CardType) => {
        let selectedCard = drawSpecificCard(deck, card.value);
        if (selectedCard) setSelectedPlayerCards([...selectedPlayerCards, selectedCard]);
    };

    const removeCard = (index: number, isDealer?: boolean) => {
        let removedCard: CardType;
        if (isDealer) {
            removedCard = selectedDealerCard[index];
            setSelectedDealerCard([{ value: '?' }]);
        } else {
            removedCard = selectedPlayerCards[index];
            setSelectedPlayerCards([...selectedPlayerCards.filter((c, i) => i !== index)]);
        }

        const newDeck = [...deck];
        newDeck.push(removedCard);
        setDeck(newDeck);
    };

    return (
        <View style={styles.container}>
            <View style={styles.dealerContainer}>
                <Text style={styles.title}>Select Dealer's Up Card</Text>
                <ScrollView style={styles.cardsContainer} horizontal>
                    {values.map((value, index) => (
                        <Card
                            key={`dealer-${index}`}
                            card={{ value: value }}
                            id={`dealer-${index}`}
                            onPress={() => handleDealerCardSelection({ value })}
                            style={
                                selectedDealerCard[1]?.value === value ? styles.selectedCard : {}
                            }
                        />
                    ))}
                </ScrollView>
                <DealerHand cards={selectedDealerCard} removeCard={removeCard} />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.decisionText}>{decision}</Text>
            </View>

            <View style={styles.playerContainer}>
                <PlayerHand cards={selectedPlayerCards} removeCard={removeCard} />
                <ScrollView style={styles.cardsContainer} horizontal>
                    {values.map((value, index) => (
                        <Card
                            key={`player-${index}`}
                            card={{ value: value }}
                            id={`player-${index}`}
                            onPress={() => handlePlayerCardSelection({ value })}
                            style={
                                selectedPlayerCards.some((card) => card.value === value)
                                    ? styles.selectedCard
                                    : {}
                            }
                        />
                    ))}
                </ScrollView>
                <Text style={styles.title}>Select Player's Cards</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    decisionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        // paddingHorizontal: 20,
        // paddingVertical: 10,
    },
    gradient: {
        borderRadius: 5,
    },
    dealerContainer: {
        marginTop: 0,
    },
    playerContainer: {
        marginBottom: 0,
        position: 'relative',
        justifyContent: 'flex-end',
    },
    contentText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },
    cardsContainer: {
        flexDirection: 'row',
        margin: 'auto',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
        height: 50,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCard: {
        backgroundColor: '#A9D9F7',
    },
});

export default Game;
