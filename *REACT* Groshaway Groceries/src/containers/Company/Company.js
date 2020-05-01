import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Company.css';
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Footer from '../../components/Footer/Footer';

const Company = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get('https://groshaway-groceries.firebaseio.com/shops.json')
            .then(response => {
                setLoading(false);

                const data = response.data;

                setShops(Object.values(data));           
            }).catch(error => {
                setLoading(false);
            });
    }, []);

    let supermarkets = shops.map(shop => {
        return (
        <Link to={'/' + shop.id} key={shop.id} style={{textDecoration: 'none', color: 'inherit'}}>
            <CompanyCard logo={shop.logo} name={shop.name} />
        </Link>);    
    });

    if (loading === true) {
        supermarkets = <Spinner />;
    }


    return (
        <div>
            <div className="company">
            <h1>Choose a supermarket</h1>
            {supermarkets}
            </div>
            <Footer />
        </div>
    );
};

export default withErrorHandler(Company, axios);