import React from 'react';
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, View } from 'react-native';
import { Card as CardType } from '../types/deckTypes';

interface CardProps {
    card: CardType;
    id: string | number;
    onPress?: () => any;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

const suitSymbols: Record<string, string> = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
};

const Card: React.FC<CardProps> = ({ card, id, onPress, style, disabled }) => {
    const handlePress = disabled ? undefined : onPress;

    return (
        <View>
            {!card.suit && (
                <TouchableOpacity
                    key={id}
                    style={[styles.cardContainer, style]}
                    onPress={handlePress}
                >
                    <View style={styles.topLeft}>
                        <Text style={[styles.suitSymbol, styles.spades]}>{suitSymbols.spades}</Text>
                    </View>
                    <View style={styles.topRight}>
                        <Text style={[styles.suitSymbol, styles.hearts]}>{suitSymbols.hearts}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={[styles.cardValue, { color: 'darkgoldenrod' }]}>
                            {card.value}
                        </Text>
                    </View>
                    <View style={styles.bottomLeft}>
                        <Text style={[styles.suitSymbol, styles.clubs]}>{suitSymbols.clubs}</Text>
                    </View>
                    <View style={styles.bottomRight}>
                        <Text style={[styles.suitSymbol, styles.diamonds]}>
                            {suitSymbols.diamonds}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            {card.suit && (
                <TouchableOpacity
                    key={id}
                    style={[styles.cardContainer, style]}
                    onPress={handlePress}
                >
                    <View style={styles.topLeft}>
                        <Text style={[styles.cardValue, styles[card.suit]]}>{card.value}</Text>
                        <Text style={[styles.suitSymbol, styles[card.suit]]}>
                            {suitSymbols[card.suit]}
                        </Text>
                    </View>
                    <View style={styles.bottomRight}>
                        <Text style={[styles.cardValue, styles[card.suit]]}>{card.value}</Text>
                        <Text style={[styles.suitSymbol, styles[card.suit]]}>
                            {' '}
                            {suitSymbols[card.suit]}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginRight: 10,
        height: 100,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {},
    topLeft: {
        position: 'absolute',
        top: 5,
        left: 5,
    },
    topRight: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    bottomLeft: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        transform: [{ rotate: '180deg' }],
    },
    bottomRight: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        transform: [{ rotate: '180deg' }],
    },
    cardValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    suitsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    suitSymbol: {
        fontSize: 14,
        marginHorizontal: 2,
    },
    hearts: {
        color: 'red',
    },
    diamonds: {
        color: 'red',
    },
    clubs: {
        color: 'black',
    },
    spades: {
        color: 'black',
    },
});

export default Card;
