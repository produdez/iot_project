import React, { useState } from 'react';
import Card from '../Card'

import HistoryFilter from './HistoryFilter';
import HistoryList from './HistoryList'

import './HistoryPage.css';

const History = (props) => {

  const [filteredMonth, setFilteredMonth] = useState('Aug');
  console.log(props.items[0].date.toLocaleString('en-US', { month: 'long' }));
  const filterChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };
  console.log(filteredMonth);
  const filteredHistory = props.items.filter((expense) => {
    return expense.date.toLocaleString('en-US', { month: 'long' }).slice(0,3) === filteredMonth;
  
  });

  return (
    <div>
      <Card className='history'>
        <HistoryFilter
          selected={filteredMonth}
          onChangeFilter={filterChangeHandler}
        />
        <HistoryList items={filteredHistory} />
      </Card>
    </div>
  );
};

export default History;