import React, { useState, useContext } from 'react';

import './Basket.css';
import Button from '../../components/Button/Button';
import BasketProduct from '../../components/BasketProduct/BasketProduct';
import Modal from '../../components/Modal/Modal';
import ContactData from '../ContactData/ContactData';
import { BasketContext } from '../../Context/BasketContext';
import { UserContext } from '../../Context/UserContext';

const Basket = (props) => {
    const [purchasing, setPurchasing] = useState(false);
    const [basket, setBasket] = useContext(BasketContext);
    const [userData, setUserData] = useContext(UserContext);

    const totalPrice = basket.reduce((acc, curr) => acc + curr.price, 4);

    const purchaseHandler = () => {
        if (userData.token != null) {
            setPurchasing(true);
        } else {
            props.hist.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const removeBasketProduct = (id) => {
        setBasket(prevItems => {
            console.log(prevItems);

            const toReturn = [
              ...prevItems.filter((item, index) => {  
                return item.id !== id // external id compared to the item currently being checked by filter
              })
            ];
            
            return toReturn
        });
    }

    const products = basket.map(product => {
        return <BasketProduct 
                    key={product.id} 
                    id={product.id} 
                    name={product.name} 
                    productType={product.productType} 
                    price={product.price} 
                    quantity={product.quantity}
                    onChecked={removeBasketProduct}
                />
    });

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                <ContactData hist={props.hist} route={props.route} id={basket.id} orderProducts={basket} finalPrice={totalPrice} />
            </Modal>
            <div className="basket">
                <h3>Basket: </h3>
                <span>Products in the basket: {basket.length}</span>
                <br />
                <span>Final Price: ${totalPrice.toFixed(2)}</span>
                <br />    
                <Button btnType="btn-basket" clicked={purchaseHandler}>{userData.token != null ? "Order" : "Sign In to order"}</Button>
                <hr />
                {products}
            </div>
        </React.Fragment> 
    );
}

export default Basket;