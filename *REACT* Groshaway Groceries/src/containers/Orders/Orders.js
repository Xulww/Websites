import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Order from '../../components/Order/Order';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { UserContext } from '../../Context/UserContext';
import Footer from '../../components/Footer/Footer';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useContext(UserContext);
    
    const userToken = userData.token;
    const userId = userData.userId;
    
    let authRedirect = null;

    if (userToken == null) {
        authRedirect = <Redirect to='/' />;
    }
    
    useEffect(() => {
        setLoading(true);
        
        const queryParams = '?auth=' + userToken + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('https://groshaway-groceries.firebaseio.com/orders.json' + queryParams)
            .then(response => {
                setLoading(false);

                const data = response.data;
             
                setOrders(Object.values(data));    
            }).catch(error => {
                setLoading(false);
            });
    }, []);

    let ordersForDisplay = orders.map((order, index) => {   
        return <Order
            id={index}
            shop={order.shop}
            products={order.products}
            price={order.price}
            orderDateTime={order.orderDateTime}
        />
    });

    if (loading === true) {
        ordersForDisplay = <Spinner />;
    }

    return (
        <div>
            <div className="footer-orders-position">
                {authRedirect}
                {ordersForDisplay}
            </div>
            <Footer />
        </div>
        
    );
}

export default withErrorHandler(Orders, axios);