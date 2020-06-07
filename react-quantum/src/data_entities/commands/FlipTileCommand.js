import Command from './Command'

class FlipTileCommand extends Command {
    constructor(tilesFlipped) {
        super();
        this.tilesFlipped = tilesFlipped;
        this.execute = this.execute.bind(this);
        this.undo = this.undo.bind(this);
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

export default FlipTileCommand