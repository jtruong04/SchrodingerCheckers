import React from 'react'
import { Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';


import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

import PropTypes from 'prop-types';


function UserMenu(props) {
    // const { anchorEl, handleClose } = props;
    const menuOpen = Boolean(props.anchorEl);


    const handleLogout = () => {
        props.logout();
        // props.setSnackProps({open:true,text:"Logged out",severity:'success'});
        props.handleClose();
    }

    return (
        <>
            <Menu
                id="menu-appbar"
                anchorEl={props.anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={menuOpen}
                onClose={props.handleClose}
            >
                <MenuItem component={Link} to='/profile' onClick={props.handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

UserMenu.propTypes = {
    logout: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { logout })(UserMenu);