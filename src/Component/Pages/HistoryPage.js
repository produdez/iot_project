import React, { useState } from 'react';
import Card from '../Card'

import HistoryFilter from './HistoryFilter';
import HistoryList from './HistoryList'

import './HistoryPage.css';

const History = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
    // console.log(expense);
  });

  return (
    <div>
      <Card className='expenses'>
        <HistoryFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <HistoryList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default History;