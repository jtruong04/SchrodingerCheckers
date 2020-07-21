import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import clsx from 'clsx';
import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '540px',
        margin: '0 auto',
        position: 'relative',
    },
    tile: (props) => ({
        width: `${100 / props.size - 2}%`,
        padding: `0 0 calc(${100 / props.size - 2}%) 0`,
        margin: '1%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1%',
        opacity: props.completed ? '15%' : '100%',
    }),
    blackTile: {
        background: grey[900],
    },
    whiteTile: {
        background: grey[50],
    },
});

const Card = (props) => {
    const classes = useStyles(props);
    const renderTiles = () => {
        return props.tiles.map((state, id) => (
            <Paper
                key={id}
                elevation={0}
                className={clsx(
                    classes.tile,
                    state ? classes.blackTile : classes.whiteTile
                )}
            />
        ));
    };

    return <div className={classes.root}>{renderTiles()}</div>;
};

Card.propTypes = {};

export default Card;
