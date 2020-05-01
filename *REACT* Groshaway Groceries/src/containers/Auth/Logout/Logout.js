import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../../../Context/UserContext';

const Logout = () => {
    const [userData, setUserData] = useContext(UserContext);

    const logout = () => {
        setUserData({token: null, userId: null});
    }

    useEffect(() => {
        logout();
    }, []);

    return <Redirect to='/'/>;
}

export default Logout;