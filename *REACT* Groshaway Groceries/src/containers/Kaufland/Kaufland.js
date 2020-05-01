import React, { useState, useEffect} from 'react';
import axios from 'axios';

import './Kaufland.css';
import ProductCard from '../ProductCard/ProductCard';
import Basket from '../Basket/Basket';
import { BasketProvider } from '../../Context/BasketContext';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Kaufland = (props) => {
    const [klandProducts, setKlandProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get('https://groshaway-groceries.firebaseio.com/shops/kaufland/products.json')
            .then(response => {
                setLoading(false);

                const data = response.data;

                setKlandProducts(Object.values(data));           
            }).catch(error => {
                setLoading(false);
            });
    }, []);
        
    let products = klandProducts.map(klandProduct => {
        return <ProductCard
            key={klandProduct.id}
            id={klandProduct.id} 
            pic={klandProduct.pic}
            productType={klandProduct.productType} 
            name={klandProduct.name} 
            price={klandProduct.price}
            quantity={klandProduct.quantity} />
    });

    if (loading === true) {
        products = <Spinner />;
    }

    return (
        <BasketProvider>
            <div>
                <Basket hist={props.history} route={props.history.location.pathname} />
                <div className="products">
                    <h1>Kaufland</h1>
                    {products}
                </div>
            </div>
        </BasketProvider> 
    );
}

export default withErrorHandler(Kaufland, axios);