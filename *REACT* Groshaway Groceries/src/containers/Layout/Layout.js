import React, { useState } from 'react';

import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    let [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosed = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((prevState) => {
            return showSideDrawer = !prevState.showSideDrawer
        });
    }

    return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosed} />
            <main>
                {props.children}
            </main>
        </React.Fragment>      
    );
}

export default Layout;