import React from 'react';

import './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = ["sideDrawer", "close"];

    if (props.open) {
        attachedClasses = ["sideDrawer", "open"];
    }

    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className="logo">Groshaway Groceries</div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>      
    );
}

export default sideDrawer;