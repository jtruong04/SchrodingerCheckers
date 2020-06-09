class Command {
    constructor(cost) {
        this.execute = this.execute.bind(this);
        this.undo = this.undo.bind(this);
        this.cost = cost;
    }

    execute(state) {
        return state;
    }

    undo(state) {
        return state;
    }
}

export default Command;