import React from 'react';

import './HistoryFilter.css';

const HistoryFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by month</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='Jan'>Jan</option>
          <option value='Feb'>Feb</option>
          <option value='Apr'>Apr</option>
          <option value='Mar'>Mar</option>
          <option value='May'>May</option>
          <option value='Jun'>Jun</option>
          <option value='Jul'>Jul</option>
          <option value='Aug'>Aug</option>
          <option value='Sep'>Sep</option>
          <option value='Oct'>Oct</option>
          <option value='Nov'>Nov</option>
          <option value='Dec'>Dec</option>
        </select>
      </div>
    </div>
  );
};

export default HistoryFilter;