import React from 'react';
import './Button.css';

const Button = ({ children, className, ...rest }) => (
    <button {...rest} className={`my-button ${ className || '' }`}>
      {children}
    </button>
);

export default Button;