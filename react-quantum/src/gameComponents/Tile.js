import React from 'react';
// import './Tile.css';

import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import clsx from 'clsx';
import { Paper } from '@material-ui/core';
// List of props available:
// props.tile : tile data
const useStyles = makeStyles({
    tile: (props) => ({
        width: `${100 / props.size - 2}%`,
        padding: `0 0 calc(${100 / props.size - 2}%) 0`,
        margin: '1%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '10%',
    }),
    blackTile: {
        background: grey[900],
    },
    whiteTile: {
        background: grey[50],
    },
});

function Tile(props) {
    const classes = useStyles(props);

    const handleClick = (e) => {
        props.handleEvent({ e, source: 'TILE', payload: [props._id] });
    };

    return (
        <Paper
            elevation={3}
            className={clsx(
                classes.tile,
                props.state ? classes.blackTile : classes.whiteTile
            )}
            onClick={handleClick}
        ></Paper>
    );
}

export default Tile;
