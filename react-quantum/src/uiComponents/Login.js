import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
import {
    // Modal,
    Paper,
    Avatar,
    Button,
    TextField,
    Typography,
    Grid,
    FormControlLabel,
    Checkbox
    // Link
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
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

function Login(props) {
    const classes = useStyles();

    // const [values, setValues] = React.useState({
    //     username: '',
    //     password: ''
    // });
    // const handleChange = name => event => {
    //     setValues({ ...values, [name]: event.target.value });
    // };
    const [remember, setRemember] = React.useState(false);
    const handleToggle = event => {
        setRemember(!remember);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.login({
            ...props.values,
            remember
        });
    }

    return (
        <Paper className = { classes.paper } >
            <Avatar className={classes.avatar}>
                <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Log In
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    onChange={props.handleChange('username')}
                    autoComplete="username"
                    value={props.values.username}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={props.handleChange('password')}
                    id="password"
                    autoComplete="current-password"
                    value={props.values.password}

                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" onChange={handleToggle}/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
          </Button>
            </form>
            <Grid container>
                {/* <Grid item xs>
                    <Button>
                        Forgot password?
                    </Button>
                </Grid> */}
                <Grid item>
                    <Button onClick={props.handleSwitch}>
                        Don't have an account? Sign up!
                    </Button>
                </Grid>
            </Grid>
        </Paper >
    )
}

Login.propTypes = {
    handleSwitch: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

});
// export default Login;
export default connect(mapStateToProps, { login })(Login);