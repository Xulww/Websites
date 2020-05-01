import React from 'react';

import './Button.css';

const button = (props) => {
    return <button className={props.btnType} onClick={props.clicked} style={props.authBool ? {padding: '10px 20px'} : {padding: '10px'}}>{props.children}</button>
}

export default button