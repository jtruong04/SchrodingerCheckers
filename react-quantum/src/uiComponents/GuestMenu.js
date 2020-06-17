import React from 'react'
import { Menu, MenuItem } from '@material-ui/core';
// import { Link } from 'react-router-dom';
// import LogIn from './LogIn';
import AuthModal from './AuthModal';
// Shows when guest user clicks their profile image

export default function GuestMenu(props) {

    const {anchorEl, handleClose} = props;
    const menuOpen = Boolean(anchorEl);

    const [ModalOpen, setModalOpen] = React.useState(false);
    const [haveAccount, setHaveAccount] = React.useState(false);

    const handleLoginOpen = () => {
        setHaveAccount(true);
        setModalOpen(true);
        handleClose();
    };
    const handleModalOpen = () => {
        setHaveAccount(false);
        setModalOpen(true);
        handleClose();
    };
    const handleModalClose = () => {
        setModalOpen(false);
        handleClose();
    };
    const handleSwitch = () => {
        setHaveAccount(!haveAccount);
    }

    return (
        <>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
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
                onClose={handleClose}
            >
                <MenuItem onClick={handleLoginOpen}>Log In</MenuItem>
                <MenuItem onClick={handleModalOpen}>Register</MenuItem>
            </Menu>
            <AuthModal open={ModalOpen}
                handleClose={handleModalClose}
                haveAccount = {haveAccount}
                handleSwitch = {handleSwitch}
            />
        </>

    )
}