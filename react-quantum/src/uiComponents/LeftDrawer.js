// React
import React from 'react';
import {Link} from 'react-router-dom';
// Material Components
import { Drawer, MenuList, MenuItem, Divider, IconButton, ListItemIcon, ListItemText, FormControlLabel, Switch} from '@material-ui/core';
// Material Icons
import ChevronLeftIcon    from '@material-ui/icons/ChevronLeft';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import TableChartIcon     from '@material-ui/icons/TableChart';
import HomeIcon           from '@material-ui/icons/Home';

function LeftDrawer(props) {

    const { classes, drawerOpen, handleDrawerClose} = props;

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={drawerOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {<ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <MenuList>
                <MenuItem component={Link} to='/' key='Home'>
                    <ListItemIcon><HomeIcon /></ListItemIcon> <ListItemText primary="Home" />
                </MenuItem>
                <MenuItem component={Link} to='/play' key='Lobby'>
                    <ListItemIcon><VideogameAssetIcon /></ListItemIcon> <ListItemText primary="Play"/>
                </MenuItem>
                <MenuItem component={Link} to='/rankings' key='Rankings'>
                    <ListItemIcon><TableChartIcon /></ListItemIcon> <ListItemText primary="Rankings" />
                </MenuItem>
            </MenuList>
            <Divider />
            <MenuItem>
                {/* <ListItemIcon><TableChartIcon /></ListItemIcon> <ListItemText primary="Rankings" /> */}
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.darkMode}
                            onChange={(event) => { props.setDarkMode(!props.darkMode) }}
                            name="darkMode"
                            color="primary"
                        />
                    }
                    label="Dark Mode"
                />
            </MenuItem>

        </Drawer>  
    );
}

export default LeftDrawer;