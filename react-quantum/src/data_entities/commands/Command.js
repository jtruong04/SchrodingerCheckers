class Command {
    constructor() {
        this.execute = this.execute.bind(this);
        this.undo = this.undo.bind(this);
    }

    execute(state) {
        return null;
    }

    undo(state) {
        return null;
    }

}

export default Command;