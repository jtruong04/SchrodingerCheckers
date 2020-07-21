export const generateRandomCard = (boardSize) => {
    const card = new Array(boardSize ** 2).fill(false);
    for (let tile = 0; tile < card.length; tile++) {
        card[tile] = Math.floor(Math.random() * 2) === 0;
    }
    return card;
};

export const generateAllCards = (numPlayers, numCards, boardSize) => {
    const playerCards = [];
    for (let player = 0; player < numPlayers; player++) {
        const cards = [];
        for (let card = 0; card < numCards; card++) {
            cards.push(generateRandomCard(boardSize));
        }

        playerCards.push(cards);
    }
    return playerCards;
};
