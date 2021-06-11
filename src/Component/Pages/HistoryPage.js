import React, { useState, useEffect } from 'react';
import Card from '../Card'

import firebase from 'firebase/app';

import HistoryList from './HistoryList'
import HistoryFilterSubject from './HistoryFilterSubject';
import SelectHistory from "./selectHistory"
import './HistoryPage.css';

const DB_ENV_NAMES = [
  'Humidity',
  'Light',
  'Moisture',
  'Temperature',
]
const ABBR_MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
]

const History = (props) => {

  const [filteredMonth, setFilteredMonth] = useState('All');
  const [filteredSubject, setFilteredSubject] = useState('All');
  const [filteredLatestItems, setFilteredLatestItems] = useState('All');

  const [hasSetListener, setHasSetListener] = useState(false);
  const [firebaseItems, setFirebaseItems] = useState({});
  const ref = firebase.database()
  // console.log('hasSetListener',hasSetListener);

  const onValueChange = (name) => (snapshot) => {
    if (snapshot.exists())  
      {
        let data = snapshot.val(); 
        console.log('change', name);
        setFirebaseItems((state) => ({...state, [name]:Object.keys(data).map((idx) => ({
          subject:name,
          id:idx,
          unixTime: Date.parse(data[idx].date),
          date:new Date(Date.parse(data[idx].date)), 
          description: `${name}: ${data[idx].data} ${data[idx].unit!==''?`(${data[idx].unit})`:''}`
        }))}))
      }
  }

  useEffect(() => {
    if (!hasSetListener)
    {
      setHasSetListener(true);
      for(const name of DB_ENV_NAMES) {
        ref.ref(name).on('value', onValueChange(name));
      }
    }

    return () => {
      for(const name of DB_ENV_NAMES) {
          ref.ref(name).off('value', onValueChange(name));
      }
    }
  })

  // combine all firebaseItems into one array for rendering (yes, it's bad, but still)
  let fullHistory = [];
  for (const idx in firebaseItems)
  {
    fullHistory = fullHistory.concat(firebaseItems[idx])
  }
  fullHistory = fullHistory.sort((a,b) => (b.unixTime-a.unixTime));
  // console.log(fullHistory);

  // console.log(props.items[0].date.toLocaleString('en-US', { month: 'long' }));
  const filterChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };
  // console.log(filteredMonth);

  const subjectFilterChangeHandler = (selectedSubject) => {
    setFilteredSubject(selectedSubject);
  }

  const latestItemsFilterChangeHandler = (selectedLatestItems) => {
    setFilteredLatestItems(selectedLatestItems);
  }

  // filter before rendering
  let filteredHistory = fullHistory;

  if (filteredMonth !== 'All') {
    filteredHistory = filteredHistory.filter((history) => {
      return history.date.toLocaleString('en-US', { month: 'long' }).slice(0,3) === filteredMonth;
    });
  }
  if (filteredSubject !== 'All') {
    filteredHistory = filteredHistory.filter((history) => {
      return history.subject === filteredSubject;
    });
  }
  if (filteredLatestItems !== 'All') {
    filteredHistory = filteredHistory.filter((history, index) => {
      return index < filteredLatestItems.substr(0, filteredLatestItems.indexOf(' '));
    });
  }


  return (
    <div>
      <SelectHistory/>
      <Card className='history'>
        <HistoryFilterSubject
          filterName={'Month'}
          selected={filteredMonth}
          onChangeFilter={filterChangeHandler}
          values={ABBR_MONTHS}
        />
        <HistoryFilterSubject
          filterName={'Subject'}
          selected={filteredSubject}
          onChangeFilter={subjectFilterChangeHandler}
          values={DB_ENV_NAMES}
        />

        <HistoryFilterSubject
          filterName={'Latest record(s)'}
          selected={filteredLatestItems}
          onChangeFilter={latestItemsFilterChangeHandler}
          values={[1,5,10,20,50].map((item)=>(`${item} item${item===1?'':'s'}`))}
        />

        <HistoryList items={filteredHistory} />
      </Card>
    </div>
  );
};

export default History;