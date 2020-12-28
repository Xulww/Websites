import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Button, Row, Col, Form } from 'react-bootstrap';

import app from './base';
import { AuthContext } from './Auth.js';

const Login = ({ history }) => {
    const handleLogin = useCallback(async event => {
        event.preventDefault();

        const { email, password } = event.target.elements;

        try {
            await app.auth().signInWithEmailAndPassword(email.value, password.value);
            history.push('/');
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <Row>
                <Col sm={6}>
                    <h4>Log In</h4>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="email">
                            <Form.Control
                                type="email"
                                name="email"
                                required
                                maxLength={100}
                                placeholder="E-mail" ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Control
                                type="password"
                                name="password"
                                minLength={6}
                                placeholder="Password" ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">LogIn</Button>
                        </Form.Group>
                    </Form>
                    <div>
                        Don't have an account?
                        <NavLink className="d-inline p-2" to="/signup">Sign Up!</NavLink>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default withRouter(Login);