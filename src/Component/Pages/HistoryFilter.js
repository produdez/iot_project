import React from 'react';

import './HistoryFilter.css';

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    // props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='2022'>Jan</option>
          <option value='2021'>Feb</option>
          <option value='2019'>Apr</option>
          <option value='2019'>Mar</option>
          <option value='2020'>May</option>
          <option value='2020'>Jun</option>
          <option value='2020'>Jul</option>
          <option value='2020'>Aug</option>
          <option value='2020'>Sep</option>
          <option value='2020'>Oct</option>
          <option value='2020'>Nov</option>
          <option value='2020'>Dec</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;