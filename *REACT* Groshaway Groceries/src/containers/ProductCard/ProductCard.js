import React, { useContext } from 'react';

import './ProductCard.css';
import Button from '../../components/Button/Button';
import { BasketContext } from '../../Context/BasketContext';

const ProductCard = (props) => {
    const [basket, setBasket] = useContext(BasketContext);

    const addToBasket = () => {
        const date = new Date().valueOf();
        const product = {key: props.id + date, id: props.id + date, name: props.name, price: props.price, productType: props.productType, quantity: props.quantity}

        setBasket(currentBasket => [...currentBasket, product]);
    }

    return (
        <div className="productCard">
            <img src={props.pic} alt={'"Photo of ' + props.productType + " " + props.name + '"'}/>
            <hr />
            <p>{props.productType} - "{props.name}"</p>
            <p>Quantity: {props.quantity}</p>
            <p>Price: ${props.price}</p>
            <hr />
            <Button btnType="button" clicked={addToBasket}>Add</Button>
        </div>
    );
}

export default ProductCard;