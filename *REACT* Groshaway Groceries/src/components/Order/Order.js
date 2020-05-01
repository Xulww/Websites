import React from 'react';

import './Order.css';

const order = (props) => {
    const orderProducts = props.products
    const shop = props.shop;
    const reformedShop = shop.charAt(0).toUpperCase() + shop.slice(1);

    const productsForDisplay = orderProducts.map(orderProduct => {   
        return <div key={orderProduct.id}>
            {orderProduct.productType} {orderProduct.name} {orderProduct.quantity} ${orderProduct.price}
        </div>
    });

    return (
        <div>
            <div key={props.id} className="order">
                <p><strong>{reformedShop}</strong></p>
                <div><strong>Date and time: </strong>{props.orderDateTime}</div>
                <div><strong>Price: </strong>${props.price.toFixed(2)}</div>
                <div><strong>Products: </strong>{productsForDisplay}</div>
            </div>
        </div>
    );
}

export default order;