import React from 'react';
// import './Tile.css';

import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import clsx from 'clsx';
// import { Paper } from '@material-ui/core';
// List of props available:
// props.tile : tile data
const useStyles = makeStyles({
    scene: (props) => ({
        width: `${100 / props.size - 2}%`,
        padding: `0 0 calc(${100 / props.size - 2}%) 0`,
        margin: '1%',
        borderRadius: '10%',

        perspective: '600%',
        overflow: 'hidden',
    }),
    tile: (props) => ({
        width: `${100 / props.size - 2}%`,
        padding: `0 0 calc(${100 / props.size - 2}%) 0`,
        margin: '1%',
        transition: 'transform 400ms',
        transitionDelay: `${props.delay}ms`,
        transformStyle: 'preserve-3d',
        // transformOrigin: 'center right',
    }),
    tileFace: {
        position: 'absolute',
        borderRadius: '10%',
        height: '100%',
        width: '100%',
        backfaceVisibility: 'hidden',
    },
    blackTile: {
        background: grey[900],
        transform: 'rotateY(180deg)',
    },
    whiteTile: {
        background: grey[50],
    },
    isFlipped: {
        transform: 'rotateY(-180deg)',
    },
    isHighlighted: {
        borderRadius: '10%',
        boxShadow: 'inset 0px 0px 5px 5px #00BFFF80',
    },
});

function Tile(props) {
    const classes = useStyles(props);

    const handleClick = (e) => {
        props.handleEvent({ e, source: 'TILE', payload: [props._id] });
    };

    return (
        <div
            elevation={3}
            className={clsx(
                classes.tile,
                props.state ? classes.isFlipped : null,
                props.highlighted ? classes.isHighlighted : null
            )}
            onClick={handleClick}
        >
            <div
                className={clsx(
                    classes.tileFace,
                    classes.blackTile,
                    props.highlighted ? classes.isHighlighted : null
                )}
            ></div>
            <div
                className={clsx(
                    classes.tileFace,
                    classes.whiteTile,
                    props.highlighted ? classes.isHighlighted : null
                )}
            ></div>
        </div>
    );
}

export default Tile;
