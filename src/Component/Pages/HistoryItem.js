import React from 'react';

import HistoryDate from './HistoryDate';
import Card from '../historyCard';
import './HistoryItem.css';

const HistoryItem = (props) => {
  console.log(props.description);
  return (
    <li>
      <Card className='history-item'>
        
        <HistoryDate date={props.date} />
        <div className='history-item__description'>
          <h2>{props.description}</h2>
          <div className='history-item__content'>time</div>
        </div>
      </Card>
    </li>
  );
};

export default HistoryItem;