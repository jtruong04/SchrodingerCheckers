import React from 'react';
import Button from '@material-ui/core/Button'

import DeleteLinkCommand from '../../data_entities/commands/DeleteLinkCommand'
// import {indexMapper1to2, indexMapper2to1} from '../../helper/indexMapper'

/**
 * This button when clicked first requests a link. Then it extracts the src and dst.
 */

// List of props available:
// this.props.state                     : entire game state
// this.props.setState                  : callback function to change game state
// this.props.appendToHistoryAndExecute : callback function to commit command to history and execute
// this.props.cost                      : cost in action points
// this.props.disabled                  : button state

class DeleteLinkButton extends React.Component {
    constructor() {
        super();
        this.changeStateRequestLink = this.changeStateRequestLink.bind(this);
        this.receiveLink = this.receiveLink.bind(this);
        this.src = null;
        this.dst = null;
    }

    changeStateRequestLink(e) {
        this.props.resetState();
        let newBoard = this.props.state.gameBoard;
        newBoard.linksOnClickCallback = this.receiveLink;
        this.props.setState({ gameBoard: newBoard });
    }

    receiveLink(src, dst) {
        this.src = src;
        this.dst = dst;
        this.createCommand();
    }

    createCommand() {
        const goOn = this.props.appendToHistoryAndExecute(new DeleteLinkCommand(this.props.cost, this.src, this.dst));
        if (goOn) {
            this.changeStateRequestLink();
        } else {
            this.props.resetState();
        }
    }

    render() {
        return <Button variant="contained" color="primary"
            disabled={this.props.disabled}
            onClick={this.changeStateRequestLink}
        >Delete Link ({this.props.cost})</Button>;
    }
}

export default DeleteLinkButton;
