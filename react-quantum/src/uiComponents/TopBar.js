// Packages
import React from 'react';
import clsx  from 'clsx';

// Material Components
import { AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';

// Material Icons
import MenuIcon      from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';

// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';


// Dummy Test Variable
// const userName = null;

function TopBar(props) {
    const {classes, drawerOpen, handleDrawerOpen} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <>
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: drawerOpen,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, drawerOpen && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title} noWrap >
                    Quantum Checkers
                </Typography>
                <Typography variant="subtitle1" noWrap >
                    {props.isAuthenticated ? props.user.username : 'Guest'}
                </Typography>
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    {
                        props.isAuthenticated ?
                            <UserMenu anchorEl={anchorEl}
                                handleClose={handleClose}
                            /> :
                            <GuestMenu anchorEl={anchorEl}
                                handleClose={handleClose}
                            />
                    }

                </div>
            </Toolbar>
        </AppBar>
        </>
    )
}


// const mapStateToProps = (state) => ({
//     user: state.auth.user,
//     isAuthenticated: state.auth.isAuthenticated
// });

export default TopBar;
// export default connect(mapStateToProps, {  })(TopBar);