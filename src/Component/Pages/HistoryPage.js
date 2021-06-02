import React, { useState } from 'react';
import Card from '../historyCard'

import HistoryFilter from './HistoryFilter';
import HistoryList from './HistoryList'

import './HistoryPage.css';

const History = (props) => {

  const [filteredMonth, setFilteredMonth] = useState('All');
  
  const filterChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };
  
  let filteredHistory = props.items.filter((history) => {
    return history.date.toLocaleString('en-US', { month: 'long' }).slice(0,3) === filteredMonth;
  });
  if(filteredMonth ==='All'){
    filteredHistory = props.items;
  }
  
  

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