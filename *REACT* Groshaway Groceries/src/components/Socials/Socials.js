import React from 'react';

import './Socials.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagramSquare, faFacebookSquare, faTwitterSquare, faYoutubeSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const socials = () => {
    return (
        <div>
            <a className="socials" href="https://www.facebook.com/Groshaway-Groceries-108614237492663/" target="_blank"><FontAwesomeIcon icon={faFacebookSquare} /></a>
            <a className="socials" href="https://www.instagram.com/groshawaygroceries/?hl=en" target="_blank"><FontAwesomeIcon icon={faInstagramSquare} /></a>
            <a className="socials" href="https://twitter.com/groshaway" target="_blank"><FontAwesomeIcon icon={faTwitterSquare} /></a>
            <a className="socials" href="https://www.youtube.com/channel/UCbXDsFq4saEMydAMGE5QXmQ" target="_blank"><FontAwesomeIcon icon={faYoutubeSquare} /></a>
            <a className="socials" href="https://www.linkedin.com/company/65425557/" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
    );
}

export default socials;