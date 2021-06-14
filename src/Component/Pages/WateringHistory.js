import React, { useState, useEffect } from 'react';
import Card from '../Card'

import firebase from 'firebase/app';

import HistoryList from './HistoryList'
import HistoryFilterSubject from './HistoryFilterSubject';
import SelectHistory from "./selectHistory"
import './HistoryPage.css';

const DB_ENV_NAMES = [
  'WaterInterval'
]
const ABBR_MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
]
const validateTimeInterval = (intervalString) => {
  const INVALID_ANNOUCEMENT = "Invalid time interval";
  const tokens = intervalString.split(':');

  if (tokens.length < 3) {
    return INVALID_ANNOUCEMENT;
  }
  for (let i = 0; i < tokens.length; i++)
  {
    let intToken = parseInt(tokens[i])
    if (isNaN(intToken))
    {
      return INVALID_ANNOUCEMENT;
    } 
  }
  return intervalString;
}

const History = (props) => {
  const [plantID, setPlantID] = useState(props.plant.id)
  const [filteredMonth, setFilteredMonth] = useState('All');
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
          description: `Interval ${validateTimeInterval(data[idx].time_interval)}`
        }))}))
      }
  }

  useEffect(() => {
    if (!hasSetListener)
    {
      setHasSetListener(true);
      for(const name of DB_ENV_NAMES) {
        ref.ref(name).orderByChild("plant_id").equalTo(plantID.toString()).on('value', onValueChange(name));
      }
    }

    return () => {
      for(const name of DB_ENV_NAMES) {
          ref.ref(name).orderByChild("plant_id").equalTo(plantID.toString()).off('value', onValueChange(name));
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