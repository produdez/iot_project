import React from 'react';

import './HistoryFilter.css';

const HistoryFilterSubject = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>{props.filterName}</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='All'>All</option>
          {
            props.values.map(item => {
              return <option key={item} value={item}>{item}</option>
            })
          }
        </select>
      </div>
    </div>
  );
};

export default HistoryFilterSubject;