import React from 'react';
import { connect } from 'react-redux';
import Tile from './Tile.js';
import Link from './Link.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { CSSTransitionGroup } from 'react-transition-group';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import './Board.css';

// List of props available:
// this.props.board : the game board

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '540px',
        margin: '0 auto',
        position: 'relative',
    },
}));
function Board(props) {
    const classes = useStyles();

    const renderTiles = () => {
        return props.board.tiles.map((tile, idx) => (
            <Tile
                // key={idx}
                _id={idx}
                state={tile}
                size={props.size}
                handleEvent={props.handleEvent}
            />
        ));
    };

    const renderLinks = () => {
        let renderedLinks = [];
        props.board.links.forEach((dstList, src) =>
            dstList.forEach((dst) =>
                renderedLinks.push(
                    <CSSTransition
                        key={src * props.size ** 2 + dst}
                        classNames='scale_and_fade'
                        timeout={{ exit: 200, enter: 200 }}
                    >
                        <Link
                            dst={dst}
                            src={src}
                            size={props.size}
                            handleEvent={props.handleEvent}
                        />
                    </CSSTransition>
                )
            )
        );

        return renderedLinks;
    };

    return (
        <div className={classes.root}>
            {renderTiles()}
            <TransitionGroup>{renderLinks()}</TransitionGroup>
        </div>
    );
}

const mapStateToProps = (state) => ({
    board: state.game.state.present.board,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
