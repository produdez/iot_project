import React from 'react';

import './Card.css';

const Card = (props) => {
  const classes = 'cardFake ' + props.className;

  return <div className={classes}>{props.children}</div>;
};

export default Card;