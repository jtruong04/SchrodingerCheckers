import Command from './Command'

/**
 * This object when executed deletes a preexisting link.
 */

class DeleteLinkCommand extends Command {
    constructor(cost, src, dst) {
        super(cost);
        this.src = src;
        this.dst = dst;
    }

    execute(state) {
        let newState = state;
        console.log(newState.gameBoard.links, this.src, this.dst);
        newState.gameBoard.links.get(this.src).delete(this.dst);
        return newState;
    }

    undo(state) {
        let newState = state;
        newState.gameBoard.links.get(this.src).add(this.dst);
        return newState;
    }
}

export default DeleteLinkCommand