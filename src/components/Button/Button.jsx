import React from 'react';

import './Button.css';

const Button = ({ type, color, children }) => {
  return (
    <button className={`button is-${color}`} type={type || 'button'}>
      {children}
    </button>
  );
};

export default Button;
