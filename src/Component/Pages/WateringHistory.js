import React, { useState } from 'react';
import Card from '../Card'

import HistoryFilter from './HistoryFilter';
import HistoryList from './HistoryList'
import SelectHistory from "./selectHistory"
import './HistoryPage.css';

const WateringHistory = (props) => {

  const [filteredMonth, setFilteredMonth] = useState('All');
  
  const filterChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };
  console.log(filteredMonth);
  let filteredHistory = props.items.filter((history) => {
    return history.date.toLocaleString('en-US', { month: 'long' }).slice(0,3) === filteredMonth;
  });
  if(filteredMonth ==='All'){
    filteredHistory = props.items;
  }
  
  

  return (
    <div>
      <SelectHistory/>
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

export default WateringHistory;