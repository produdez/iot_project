import React from 'react';

import './historyCard.css';

const historyCard = (props) => {
  const classes = 'hcard ' + props.className;

  return <div className={classes}>{props.children}</div>;
};

export default historyCard;