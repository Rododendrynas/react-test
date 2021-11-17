import React from 'react';

import './Notification.css';

const Notification = ({ background, children }) => {
  const style = {
    background: background || 'yellow',
  };

  return (
    <div className="notification" style={style}>
      {children}
    </div>
  );
};

export default Notification;
