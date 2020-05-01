import React from 'react';

import './Footer.css';
import Socials from '../Socials/Socials';

const footer = () => {
    const year = () => {
        const date = new Date();

        return date.getFullYear();
    }

    return (
        <div className="footer">
            <hr />
            <Socials />
            <footer>&copy; {year()} Groshaway Groceries</footer>
        </div>
    );
}

export default footer;