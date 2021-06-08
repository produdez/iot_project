import React, { useState } from 'react';
import Card from '../Card'

import firebase from 'firebase/app';

import HistoryFilter from './HistoryFilter';
import HistoryList from './HistoryList'

import './HistoryPage.css';

const DB_ENV_NAMES = [
  'Humidity',
  'Light',
  'Moisture',
  'Temperature',
  'Relay',
]

const History = (props) => {

  const [filteredMonth, setFilteredMonth] = useState('All');
  const [hasSetListener, setHasSetListener] = useState(false);
  const [firebaseItems, setFirebaseItems] = useState({});
  const ref = firebase.database()

  if (!hasSetListener)
  {
    setHasSetListener(true);
    for(const name of DB_ENV_NAMES) {
      ref.ref(name).on('value', (snapshot) => {
        if (snapshot.exists())  
        {
          let data = snapshot.val(); 
          setFirebaseItems((state) => ({...state, [name]:Object.keys(data).map((idx) => ({
            id:name+idx,
            unixTime: Date.parse(data[idx].date),
            date:new Date(Date.parse(data[idx].date)), 
            description: name+" "+data[idx].data,
          }))}))
        }
      })
    }
  }

  let renderItems = [];
  for (const idx in firebaseItems)
  {
    renderItems = renderItems.concat(firebaseItems[idx])
  }
  renderItems = renderItems.sort((a,b) => (b.unixTime-a.unixTime));
  console.log(renderItems);

  console.log(props.items[0].date.toLocaleString('en-US', { month: 'long' }));
  const filterChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };
  console.log(filteredMonth);
  let filteredHistory = renderItems.filter((history) => {
    return history.date.toLocaleString('en-US', { month: 'long' }).slice(0,3) === filteredMonth;
  });
  if(filteredMonth ==='All'){
    filteredHistory = renderItems;
    if (filteredHistory === undefined) filteredHistory = [];
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