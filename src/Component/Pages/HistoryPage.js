import React, { useState, useEffect } from 'react';
import Card from '../Card'
import {Line} from "react-chartjs-2"
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

const ITEM_AMOUNT = [
  1, 5, 10, 20, 50, 100, 200,
]

const TIME_INTERVALS = {
  ONE_MIN: {
    text:' 1 min',
    seconds: 60,
  },
  TEN_MIN: {
    text:'10 mins',
    seconds: 600,
  },
  ONE_HOUR: {
    text: '1 hour',
    seconds: 3600,
  },
  TEN_HOUR: {
    text: '10 hours',
    seconds: 36000,
  },
  ONE_DAY: {
    text: '1 day',
    seconds: 86400,
  },
  ONE_WEEK: {
    text:'1 week',
    seconds: 604800, 
  },
  TWO_WEEK: {
    text:'2 weeks',
    seconds: 1209600,
  },
  ONE_MONTH: {
    text: '1 month',
    seconds: 2419200,
  },
}

const History = (props) => {
  const [plantID, setPlantID] = useState(props.plant.id)
  const [filteredMonth, setFilteredMonth] = useState('All');
  const [filteredSubject, setFilteredSubject] = useState('All');
  const [filteredLatestItems, setFilteredLatestItems] = useState('All');
  const [filteredNearestTime, setFilteredNearestTime] = useState('All');
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
        description: `${name}: ${data[idx].data} ${data[idx].unit!==''?`(${data[idx].unit})`:''}`,
        data_value: data[idx].data
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
  let graph_data = [];
  let graph_time = [];

  for (const idx in firebaseItems)
  {
    fullHistory = fullHistory.concat(firebaseItems[idx])
  }
  fullHistory = fullHistory.sort((a,b) => (b.unixTime-a.unixTime));
  // console.log(fullHistory);

  const filterChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };

  const subjectFilterChangeHandler = (selectedSubject) => {
    setFilteredSubject(selectedSubject);
  }

  const latestItemsFilterChangeHandler = (selectedLatestItems) => {
    setFilteredLatestItems(selectedLatestItems);
  }

  const nearestTimeFilterChangeHandler = (selectedNearestTime) => {
    setFilteredNearestTime(selectedNearestTime);
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
  if (filteredNearestTime !== 'All') {
    let now = Date.now() // for consitency among items
    let timeInterval = Object.values(TIME_INTERVALS).filter((item) => (item.text===filteredNearestTime));
    if (timeInterval.length === 1)
    {
      filteredHistory = filteredHistory.filter((history) => {
          return now - history.date < timeInterval[0].seconds*1000;
      });
    }
  }

  // prepare graph data
  // console.time('prepare graph')
  if (filteredSubject !== 'All') {
    filteredHistory.forEach((item) => {
      if (item.subject === filteredSubject)
      {
        graph_data = [item.data_value, ...graph_data];
        graph_time = [item.date.toISOString().replace("T","-").replace(/....Z/i,""), ...graph_time];
      }
    })
  }
  // console.timeEnd('prepare graph')
  
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
          values={ITEM_AMOUNT.map((item)=>(`${item} item${item===1?'':'s'}`))}
        />
        

        <HistoryFilterSubject
          filterName={'Recent'}
          selected={filteredNearestTime}
          onChangeFilter={nearestTimeFilterChangeHandler}
          values={Object.values(TIME_INTERVALS).map(({text}) => (text))}
        />
        
        {filteredSubject!=="All"?
        <>
        <Card className='graph-item'>
          <div>
          <Line
            data= {{
                labels: graph_time,
                datasets: [
                    {
                        label: filteredSubject,
                        data: graph_data,
                        backgroundColor: 'rgb(97, 207, 139)',
                        borderColor: 'rgb(97, 207, 139)',
                    },
                ],
            }}
            height = {2}
            width = {5}
            options= {{
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked: true
                    }
                },
            }}
          />
          </div>
          </Card>
        </>
        :null}
        <HistoryList items={filteredHistory} />
      </Card>
    </div>
  );
};

export default History;