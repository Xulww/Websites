import React, { useContext } from 'react';

import './BasketProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const BasketProduct = (props) => {
    return (
        <div key={props.id}>
            <p>{props.productType} {props.name} {props.quantity} ${props.price}</p>
            <span onClick={(id) => props.onChecked(props.id)}><FontAwesomeIcon className="minus" icon={faMinusSquare} /></span>
            <hr />
        </div>   
    );
}

export default BasketProduct;