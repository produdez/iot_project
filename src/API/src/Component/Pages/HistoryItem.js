import React from 'react';

import HistoryDate from './HistoryDate';
import Card from '../Card';
import './HistoryItem.css';

const HistoryItem = (props) => {
  return (
    <li>
      <Card className='expense-item'>
        <HistoryDate date={props.date} />
        <div className='expense-item__description'>
          <h2>{props.description}</h2>
        </div>
      </Card>
    </li>
  );
};

export default HistoryItem;