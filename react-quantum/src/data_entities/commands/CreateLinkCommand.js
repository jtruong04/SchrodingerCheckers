import Command from './Command'

/**
 * This object when executed creates a new link. It is 
 * given the source and destination tiles and a link is
 * created between them.
 */

class CreateLinkCommand extends Command {
    constructor(cost, src, dst) {
        super(cost);
        this.src = src;
        this.dst = dst;
    }

    execute(state) {
        let newState = state;
        newState.gameBoard.links.get(this.src).add(this.dst);
        return newState;
    }

    undo(state) {
        let newState = state;
        newState.gameBoard.links.get(this.src).delete(this.dst);
        return newState;
    }
}

export default CreateLinkCommand