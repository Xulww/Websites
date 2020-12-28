import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="container">
            <div className="mt-5 d-flex justify-content-left">
                <h4>Welcome to the Employee Manager System. This is a Distributed Applications Project made with React and ASP.NET WEB API. <NavLink className="d-inline p-2" to="/login">Log In</NavLink> to get access to the manager!</h4>
            </div>
        </div>
    );
}