import React from 'react';

import './HistoryFilter.css';

const HistoryFilterGraph = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>{props.filterName}</label>
        <select className='filterSize' value={props.selected} onChange={dropdownChangeHandler}>
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

export default HistoryFilterGraph;