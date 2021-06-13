import React from 'react';

import HistoryDate from './HistoryDate';
import Card from '../Card';
import './HistoryItem.css';

const HistoryItem = (props) => {
  return (
    <li>
      <Card className='history-item'>
        <HistoryDate date={props.date} />
        <div className='history-item__description'>
          <h2>{props.description}</h2>
          <p className='history-item__time'>{props.date.toLocaleTimeString('en-GB')}</p>
        </div>
      </Card>
    </li>
  );
};

export default HistoryItem;