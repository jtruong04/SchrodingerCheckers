class Command {
    constructor() {
        this.execute = this.execute.bind(this);
        this.undo = this.undo.bind(this);
    }

    execute(state) {
        return state;
    }

    undo(state) {
        return state;
    }

}

export default Command;