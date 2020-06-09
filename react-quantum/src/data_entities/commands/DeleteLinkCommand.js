import Command from './Command'

/**
 * This object when executed deletes a preexisting link.
 */

class DeleteLinkCommand extends Command {
    constructor(src, dst) {
        super();
        this.src = src;
        this.dst = dst;
    }

    execute(state) {
        let newState = state;
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