import React from 'react';

import HistoryDate from './HistoryDate';
import Card from '../Card';
import './HistoryItem.css';

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

const HistoryItem = (props) => {
  return (
    <li>
      <Card className='history-item'>
        <HistoryDate date={props.date} />
        <div className='history-item__description'>
          <h2>{props.description}</h2>
          <p className='history-item__time'>{`${pad(props.date.getHours(), 2)}:${pad(props.date.getMinutes(), 2)}:${pad(props.date.getSeconds(), 2)}`}</p>
        </div>
      </Card>
    </li>
  );
};

export default HistoryItem;