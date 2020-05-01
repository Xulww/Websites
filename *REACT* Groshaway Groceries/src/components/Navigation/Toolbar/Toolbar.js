import React from 'react';
import { Link } from 'react-router-dom';

import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className="toolbar">
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <Link to="/" style={{textDecoration: 'none'}}>
                <div className="styledText">Groshaway Groceries</div>
            </Link>
            <nav className="desktopOnly">
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;