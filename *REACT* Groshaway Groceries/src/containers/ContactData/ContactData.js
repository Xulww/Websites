import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import './ContactData.css';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { UserContext } from '../../Context/UserContext';

const ContactData = (props) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useContext(UserContext);
    const {register, handleSubmit} = useForm();
    
    const route = props.route.substring(1);

    let dateTime = new Date();
    let date = dateTime.getDate()+'-'+(dateTime.getMonth()+1)+'-'+dateTime.getFullYear();
    let time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
    let orderTime = date + ' ' + time;

    const onSubmit = (data) => {
        setLoading(true);

        const order = {
            shop: route,
            products: props.orderProducts,
            price: props.finalPrice,
            deliveryInformation: data,
            orderDateTime: orderTime,
            userId: userData.userId
        }

        axios.post('https://groshaway-groceries.firebaseio.com/orders.json?auth=' + userData.token, order)
            .then(response => {
                setLoading(false);

                props.hist.push('/');
            }).catch(error => {
                setLoading(false);
            });
    }

    let form = (<form onSubmit={handleSubmit(onSubmit)}>
                    <input className="inputElement" type="text" placeholder="Name" name="name" ref={register({required: true})}/>
                    <input className="inputElement" type="text" placeholder="Surname" name="surname" ref={register({required: true})}/>
                    <input className="inputElement" type="email" placeholder="E-mail" name="email" ref={register({required: true})}/>
                    <input className="inputElement" disabled type="text" placeholder="City" name="city" value="New York" ref={register({required: true})}/>
                    <input className="inputElement" type="text" placeholder="Street" name="street" ref={register({required: true})}/>
                    <input className="inputElement" type="text" placeholder="Street Number" name="streetNumber" ref={register({required: true})}/>
                    <input className="inputElement" type="text" placeholder="Phone Number" name="phoneNumber" ref={register({required: true})}/>
                    <Button btnType="button">FINISH ORDER</Button>
                </form>);

    if (loading === true) {
        form = <Spinner />;
    }

    return (
        <div className="contactData">
            <h4>Please, enter your information in every input and press "finish order"</h4>
            {form}
        </div>
    );
}

export default withErrorHandler(ContactData, axios);