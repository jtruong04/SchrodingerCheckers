import React from 'react';
// FontAwesome Characters
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLongArrowAltDown,
    faLongArrowAltUp,
    faLongArrowAltLeft,
    faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';

// import './Link.css';
import { indexMapper1to2 } from '../helper/indexMapper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const calculatePosition = (src, dst, boardSize) => {
    const [fromRow, fromCol] = indexMapper1to2(src, boardSize);
    const [toRow, toCol] = indexMapper1to2(dst, boardSize);
    let xShift = 0,
        yShift = 0;
    const shift = 4;
    if (toRow - fromRow === 1) {
        xShift = -shift;
    } else if (toRow - fromRow === -1) {
        xShift = +shift;
    } else if (toCol - fromCol === 1) {
        yShift = +shift;
    } else if (toCol - fromCol === -1) {
        yShift = -shift;
    }
    const top =
        50 / boardSize +
        (100 / boardSize) * fromRow +
        (50 / boardSize) * (toRow - fromRow) +
        yShift +
        '%';
    const left =
        50 / boardSize +
        (100 / boardSize) * fromCol +
        (50 / boardSize) * (toCol - fromCol) +
        xShift +
        '%';
    return { top, left };
};

const useStyles = makeStyles({
    // prettier-ignore
    link: (props)=>({
      zIndex        : 5,
      position      : 'absolute',
      textAlign     : 'center',
      fontSize      : 'calc(2.5vw + 2.5vh)',
      color         : 'grey',
      background    : '#0000',
      border        : 0,
      display       : 'flex',
      justifyContent: 'center',
      alignItems    : 'center',
      ...calculatePosition(props.src, props.dst, props.size)
    }),
    // prettier-ignore
    link_centering: (props) => ({
        position      : 'absolute',
        transform     : 'translate(-50%, -50%)',
        ...calculatePosition(props.src, props.dst, props.size),
    }),
    isHighlighted: {
        filter: 'drop-shadow( 0px 0px 5px red)',
    },
});

function Link(props) {
    const classes = useStyles(props);

    const arrow = (src, dst, boardSize) => {
        const [fromRow, fromCol] = indexMapper1to2(src, boardSize);
        const [toRow, toCol] = indexMapper1to2(dst, boardSize);
        const assert = require('assert');
        assert(
            (fromRow - toRow === 0 && Math.abs(fromCol - toCol) === 1) ||
                (Math.abs(fromRow - toRow) === 1 && fromCol - toCol === 0)
        );
        if (toRow - fromRow === 1) {
            return <FontAwesomeIcon icon={faLongArrowAltDown} />;
        } else if (toRow - fromRow === -1) {
            return <FontAwesomeIcon icon={faLongArrowAltUp} />;
        } else if (toCol - fromCol === 1) {
            return <FontAwesomeIcon icon={faLongArrowAltRight} />;
        } else if (toCol - fromCol === -1) {
            return <FontAwesomeIcon icon={faLongArrowAltLeft} />;
        }
    };

    const handleClick = (e) => {
        props.handleEvent({
            e,
            source: 'LINK',
            payload: [props.src, props.dst],
        });
    };

    return (
        <div
            className={clsx(
                classes.link,
                props.highlighted ? classes.isHighlighted : null
            )}
        >
            <div className={clsx(classes.link_centering)} onClick={handleClick}>
                {arrow(props.src, props.dst, props.size)}
            </div>
        </div>
    );
}

export default Link;
