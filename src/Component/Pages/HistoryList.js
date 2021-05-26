import React from 'react';

import HistoryItem from './HistoryItem';
import './HistoryList.css';

const HistoryList = (props) => {
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no history.</h2>;
  }

  return (
    <ul className='expenses-list'>
      {props.items.map((expense) => (
        <HistoryItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  );
};

export default HistoryList;