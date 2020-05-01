import React, { useContext } from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { UserContext } from '../../../Context/UserContext';

const NavigationItems = () => {
    const [userData, setUserData] = useContext(UserContext);
    const userToken = userData.token;

    return (
        <ul className="navigationItems">
            <NavigationItem link="/" exact>Shops</NavigationItem>
            {userToken != null ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {userToken == null ? <NavigationItem link="/auth">Authenticate</NavigationItem> : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    );
}

export default NavigationItems;