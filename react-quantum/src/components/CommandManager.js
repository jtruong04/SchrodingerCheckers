import React from 'react'
// import Button from "react-bootstrap/Button";

// Import commands
import FlipTileCommand from './commands/FlipTileCommand.js'

class CommandManager extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // console.log(this.props.board);
    // }

    render() {
        return (
            <FlipTileCommand 
                setState={this.props.setState}
                board={this.props.board}
                players={this.props.players}
            />
        );
    }
}

export default CommandManager;