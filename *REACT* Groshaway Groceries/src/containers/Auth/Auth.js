import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './Auth.css';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import { UserContext } from '../../Context/UserContext';
import Footer from '../../components/Footer/Footer';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorReceived, setErrorReceived] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [expirationTime, setExpirationTime] = useState('');
    const [userData, setUserData] = useContext(UserContext);
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        setLoading(true);

        const authData = {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjjdMyZJhbJEBQJt-yf4OLvxd-QGDjJQA';
        
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjjdMyZJhbJEBQJt-yf4OLvxd-QGDjJQA';
        }

        axios.post(url, authData)
            .then(res => {
                setLoading(false);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                // localStorage.setItem('token', res.data.idToken);
                // localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', res.data.localId);
                setExpirationTime(res.data.expiresIn);
                setUserData({token: res.data.idToken, userId: res.data.localId});

                // checkAuthTimeout();
            })
            .catch(err => {
                setLoading(false);
                setErrorReceived(true);
                setErrorMessage(err.response.data.error.message);       
            });
    };
    
    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    };

    // const logout = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('expirationDate');
    //     localStorage.setItem('userId', res.data.localId);
    //     setUserData({token: null, userId: null});
    // }

    // const actualExpirationTime = expirationTime * 1000;
    
    // const checkAuthTimeout = () => {
    //     setTimeout(() => {
    //         logout();
    //     }, actualExpirationTime);    
    // }

    let form = (<form onSubmit={handleSubmit(onSubmit)}>
                    <input className="inputElement" type="email" placeholder="E-mail" name="email" ref={register({required: true})}/>
                    <input className="inputElement" type="password" placeholder="Password" name="password" ref={register({required: true, minLength: {value: 6, message: "Your password is too short!"}})}/>
                    {errors.password && <p>{errors.password.message}</p>}
                    <Button btnType="button" authBool={!isSignUp}>{!isSignUp ? 'LogIn' : 'Register'}</Button>
                </form>);

    if (loading === true) {
        form = <Spinner />;
    }

    let authRedirect = null;

    if (userData.token != null) {
        authRedirect = <Redirect to='/' />;
    }

    return (
        <div>
            <div className="footer-position">
                <div className="auth">
                    {authRedirect}
                    <h2>{!isSignUp ? 'LogIn' : 'Register'}</h2>
                    {errorReceived ? <p>{errorMessage}</p> : null}
                    {form}
                    <hr />
                    <p className="note"><i>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</i></p>
                    <Button btnType="btn-grey" clicked={switchAuthModeHandler} authBool={isSignUp}>{isSignUp ? 'LogIn' : 'Register'}</Button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Auth;