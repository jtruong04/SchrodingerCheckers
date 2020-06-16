import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Modal
} from '@material-ui/core';
// import LockIcon from '@material-ui/icons/Lock';
// import HowToRegIcon from '@material-ui/icons/HowToReg';
import Register from './Register';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        marginTop: 'auto', //theme.spacing(0),
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AuthModal(props) {
    const classes = useStyles();
    const { open, handleClose, haveAccount, handleSwitch } = props;
// 
    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <>
            <CssBaseline />
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                {haveAccount ?
                    <Login handleSwitch={handleSwitch}
                            handleChange={handleChange}
                            values={values} /> :
                    <Register handleSwitch={handleSwitch}
                        handleChange={handleChange}
                        values={values} />
                }
            </Modal>
        </>
    )
}
