import Command from './Command'

/**
 * This object when executed computes the new state after flipping all tiles in 
 * given an initial state. The tiles flipped are given to it during construction.
 * Since tiles are two sided, undo is just executing the same command again.
 */

class FlipTilesCommand extends Command {
    constructor(tilesFlipped) {
        super();
        this.tilesFlipped = tilesFlipped;
    }

    execute(state) {
        let newState = state;
        this.tilesFlipped.forEach( tileID => {
            newState.gameBoard.tiles[tileID].state = !newState.gameBoard.tiles[tileID].state;
        });
        return newState;
    }

    undo(state) {
        return this.execute(state);
    }
}

export default FlipTilesCommand