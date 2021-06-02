import React from 'react';

import HistoryItem from './HistoryItem';
import './HistoryList.css';

const HistoryList = (props) => {
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no history.</h2>;
  }

  return (
    <ul className='expenses-list'>
      {props.items.map((history) => (
        <HistoryItem
          key={history.id}
          title={history.title}
          date={history.date}
        />
      ))}
    </ul>
  );
};

export default HistoryList;