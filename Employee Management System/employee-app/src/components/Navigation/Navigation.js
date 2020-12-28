import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import { AuthContext } from '../Auth/Auth';
import app from '../Auth/base';

export const Navigation = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">Home</NavLink>
                    {currentUser ? <NavLink className="d-inline p-2 bg-dark text-white" to="/department">Department</NavLink> : null}
                    {currentUser ? <NavLink className="d-inline p-2 bg-dark text-white" to="/company">Company</NavLink> : null}
                    {currentUser ? <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">Employee</NavLink> : null}
                    {!currentUser ? <NavLink className="d-inline p-2 bg-dark text-white" to="/login">Login</NavLink> : null}
                    {currentUser ? <NavLink className="d-inline p-2 bg-dark text-white" to="/" onClick={() => app.auth().signOut()}>Logout</NavLink> : null}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}