import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Lidl.css';
import ProductCard from '../ProductCard/ProductCard';
import Basket from '../Basket/Basket';
import { BasketProvider } from '../../Context/BasketContext';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Lidl = (props) => {
    const [lidlProducts, setLidlProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get('https://groshaway-groceries.firebaseio.com/shops/lidl/products.json')
            .then(response => {
                setLoading(false);

                const data = response.data;

                setLidlProducts(Object.values(data));           
            }).catch(error => {
                setLoading(false);
            });
    }, []);

    let products = lidlProducts.map(lidlProduct => {
        return <ProductCard
            key={lidlProduct.id} 
            id={lidlProduct.id}
            pic={lidlProduct.pic} 
            productType={lidlProduct.productType} 
            name={lidlProduct.name} 
            price={lidlProduct.price}
            quantity={lidlProduct.quantity} />
    });

    if (loading === true) {
        products = <Spinner />;
    }

    return (
        <BasketProvider>
            <div>
                <Basket hist={props.history} route={props.history.location.pathname} />
                <div className="products">
                    <h1>Lidl</h1>
                    {products}
                </div>
            </div>
        </BasketProvider>     
    );
}

export default withErrorHandler(Lidl, axios);