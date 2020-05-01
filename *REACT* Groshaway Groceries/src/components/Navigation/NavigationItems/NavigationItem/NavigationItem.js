import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className="navigationItem">
            <NavLink 
                to={props.link} 
                exact={props.exact}
                activeClassName="active">{props.children}</NavLink>
        </li>
    );
}

export default navigationItem;