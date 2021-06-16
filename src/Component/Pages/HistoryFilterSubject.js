import React from 'react';

import './HistoryFilter.css';
/*
  props:
    filterName: the name of the filter
    selected: name of selected option
    values: Array of options
    noAllOption: if true, then 'all' option is not included
*/
const HistoryFilterSubject = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>{props.filterName}</label>
        <select className='filterSize' value={props.selected} onChange={dropdownChangeHandler}>
          {props.noAllOption?null:<option value='All'>All</option>}
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