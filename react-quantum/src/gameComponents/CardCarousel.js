import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Grid from '@material-ui/core/Grid';

export const CardCarousel = (props) => {
    const [player, setPlayer] = React.useState(0);
    const [card, setCard] = React.useState(0);

    return (
        <Grid
            item
            container
            spacing={1}
            direction='column'
            justify='center'
            alignItems='center'
            alignContent='center'
            wrap='nowrap'
        >
            <Grid item container xs={12} justify='center' alignItems='center'>
                <IconButton
                    onClick={() =>
                        setPlayer(
                            (((player - 1) % props.numPlayers) +
                                props.numPlayers) %
                                props.numPlayers
                        )
                    }
                >
                    <ArrowLeftIcon />
                </IconButton>
                Player {player + 1}
                <IconButton
                    onClick={() =>
                        setPlayer(
                            (((player + 1) % props.numPlayers) +
                                props.numPlayers) %
                                props.numPlayers
                        )
                    }
                >
                    <ArrowRightIcon />
                </IconButton>
            </Grid>
            <Grid container item xs={12} justify='center' alignItems='center'>
                <Grid item>
                    <IconButton
                        onClick={() =>
                            setCard(
                                (((card - 1) % props.numCards) +
                                    props.numCards) %
                                    props.numCards
                            )
                        }
                    >
                        <ArrowLeftIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <Card
                        size={props.size}
                        tiles={props.playerCards[player][card]}
                        completed={props.completedCards[player][card]}
                    />
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() =>
                            setCard(
                                (((card + 1) % props.numCards) +
                                    props.numCards) %
                                    props.numCards
                            )
                        }
                    >
                        <ArrowRightIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

CardCarousel.propTypes = {};

const mapStateToProps = (state) => ({
    playerCards: state.game.state.present.playerCards,
    completedCards: state.game.state.present.completedCards,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CardCarousel);
