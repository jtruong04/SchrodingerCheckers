import React from 'react';
import Button from 'react-bootstrap/Button'

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
        // this.changeStateRequestAdjacentTile = this.changeStateRequestAdjacentTile.bind(this);
        // this.receiveDestination = this.receiveDestination.bind(this);
        this.src = null;
        this.dst = null;
    }

    changeStateRequestLink(e) {
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
        this.props.appendToHistoryAndExecute(new DeleteLinkCommand(this.props.cost, this.src, this.dst));
        this.changeStateRemoveCallback();
    }

    changeStateRemoveCallback() {
        let newBoard = this.props.state.gameBoard;
        newBoard.linksOnClickCallback = null;
        this.props.setState({ gameBoard: newBoard });
    }

    render() {
        return <Button 
            disabled={this.props.disabled}
            onClick={this.changeStateRequestLink}
        >Delete Link ({this.props.cost})</Button>;
    }
}

export default DeleteLinkButton;
