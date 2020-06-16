import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Avatar,
    Button,
    TextField,
    Typography,
    Grid
} from '@material-ui/core';
import HowToRegIcon from '@material-ui/icons/HowToReg';

import { connect } from 'react-redux';
import { register } from '../actions/authActions';

import PropTypes from 'prop-types';

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

function validateEmail(email) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
};

const Register = (props) => {
    const classes = useStyles();



    const [pwdsMatch, setPwdsMatch] = React.useState(true);
    const [isValidEmail, setIsValidEmail] = React.useState(true);



    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateEmail(props.values.email)) {
            setIsValidEmail(true);
            if(props.values.password === props.values.password2) {
                setPwdsMatch(true);
                // POST
                props.register(props.values);
            } else {
                setPwdsMatch(false);
            }
        } else {
            setIsValidEmail(false);
            if (props.values.password !== props.values.password2) {
                setPwdsMatch(false);
            } 
        }
    }

    return (
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <HowToRegIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
        </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={props.handleChange('email')}
                    error={!isValidEmail}
                    helperText={!isValidEmail ? "Invalid email address" : ""}
                    value={props.values.email}
                    autoFocus={!Boolean(props.values.email)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="username"
                    onChange={props.handleChange('username')}
                    autoFocus={Boolean(props.values.email)}

                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={props.handleChange('password')}
                    value={props.values.password}

                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    onChange={props.handleChange('password2')}
                    error={!pwdsMatch}
                    helperText={!pwdsMatch ? "Passwords do not match" : ""}

                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register
                </Button>
            </form>
            <Grid container>
                <Grid item >
                    <Button onClick={props.handleSwitch}>
                        Already have an account? Log in!
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

Register.propTypes = {
    handleSwitch: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    
});
// export default Register;
export default connect(mapStateToProps, { register })(Register);