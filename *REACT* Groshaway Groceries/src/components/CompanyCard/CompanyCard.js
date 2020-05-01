import React from 'react';

import './CompanyCard.css';

const companyCard = (props) => {
    return (
        <div className="companyCard">
            <div><img src={props.logo} alt="photo of shop"/></div>
            <div className="name">{props.name}</div>
        </div>
    );
}

export default companyCard;