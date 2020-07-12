import {
    SET_STATE,
    FLIP_TILE,
    CREATE_LINK,
    DELETE_LINK,
    END_TURN,
} from '../actions/types';
import { produce, current } from 'immer';
import { pull, union } from 'lodash';
import config from '../config.json';
// import traverseGraph from '../helper/traverseGraph';
// import checkVictory from '../helper/checkVictory';
import compareArrays from '../helper/compareArrays';
import { generateAllCards } from '../helper/generateRandomCard';

const initialState = {
    board: {
        tiles: new Array(config.boardSize ** 2).fill(false),
        links: new Array(config.boardSize ** 2).fill([]),
    },
    playerCards: generateAllCards(
        2,
        config.numberTargetCards,
        config.boardSize
    ),
    completedCards: new Array(2).fill(
        new Array(config.numberTargetCards).fill(false)
    ),
    actionPoints: config.startingActionPoints,
    currentPlayer: 0,
};

export default produce((draft, action) => {
    if (!draft) {
        draft = initialState;
        return draft;
    }
    const { type, payload, cost = 0 } = action;
    switch (type) {
        case SET_STATE:
            draft = payload.newState;
            break;
        case FLIP_TILE:
            // const tilesToFlip = traverseGraph(draft.board.links, [payload]);
            payload.forEach((tile) => {
                draft.board.tiles[tile] = !draft.board.tiles[tile];
            });
            const currentBoard = current(draft.board.tiles);
            const currentPlayerCards = current(draft.playerCards);
            const currentCompletion = current(draft.completedCards);
            draft.completedCards = currentPlayerCards.map((player, p) =>
                player.map(
                    (card, c) =>
                        compareArrays(card, currentBoard) ||
                        currentCompletion[p][c]
                )
            );
            break;
        case CREATE_LINK:
            if (
                draft.board.links[parseInt(payload.src)].includes(payload.dst)
            ) {
                return;
            }
            draft.board.links[parseInt(payload.src)] = union(
                draft.board.links[parseInt(payload.src)],
                [payload.dst]
            );
            break;
        case DELETE_LINK:
            pull(draft.board.links[parseInt(payload.src)], payload.dst);
            break;
        case END_TURN:
            draft.currentPlayer = (draft.currentPlayer + 1) % config.maxPlayers;
            draft.actionPoints = config.startingActionPoints;
            break;
        default:
            break;
    }
    draft.actionPoints -= cost;
});
