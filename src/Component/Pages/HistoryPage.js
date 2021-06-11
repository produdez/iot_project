import React, { useState } from 'react';
import Card from '../Card'
import {Line} from "react-chartjs-2"
import firebase from 'firebase/app';

import HistoryFilter from './HistoryFilter';
import HistoryList from './HistoryList'
import HistoryFilterSubject from './HistoryFilterSubject';

import './HistoryPage.css';

const DB_ENV_NAMES = [
  'Humidity',
  'Light',
  'Moisture',
  'Temperature',
]

const History = (props) => {

  const [filteredMonth, setFilteredMonth] = useState('All');
  const [filteredSubject, setFilteredSubject] = useState('All');
  const [filteredLatestItems, setFilteredLatestItems] = useState('All');
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
            subject:name,
            id:idx,
            unixTime: Date.parse(data[idx].date),
            date:new Date(Date.parse(data[idx].date)),
            description: `${name}: ${data[idx].data} ${data[idx].unit!==''?`(${data[idx].unit})`:''}`,
            data_value: data[idx].data
          }))}))
        }
      })
    }
  }

  // combine all firebaseItems into one array for rendering (yes, it's bad, but still)
  let fullHistory = [];
  let temp_data = [];
  let temp_time = [];
  let humid_data = [];
  let humid_time = [];
  let light_data = [];
  let light_time = [];
  let moist_data = [];
  let moist_time = [];
  let graph_data = [];
  let graph_time = [];

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

  for (var i = 0; i < filteredHistory.length; i++) {
    switch(filteredHistory[i].subject) {
      case "Humidity":
        {
          humid_data = humid_data.concat(filteredHistory[i].data_value);
          humid_time = humid_time.concat(filteredHistory[i].date.toISOString().replace("T","-").replace(/....Z/i,""));
          break;
        }
      case "Temperature":
        {
          temp_data = temp_data.concat(filteredHistory[i].data_value);
          temp_time = temp_time.concat(filteredHistory[i].date.toISOString().replace("T","-").replace(/....Z/i,""));
          break;
        }
      case "Light":
        {
          light_data = light_data.concat(filteredHistory[i].data_value);
          light_time = light_time.concat(filteredHistory[i].date.toISOString().replace("T","-").replace(/....Z/i,""));
          break;
        }
      case "Moisture":
        {
          moist_data = moist_data.concat(filteredHistory[i].data_value);
          moist_time = moist_time.concat(filteredHistory[i].date.toISOString().replace("T","-").replace(/....Z/i,""));
          break;
        }
      default:
        break;
    }
  }

  switch(filteredSubject) {
    case "Humidity":
      {
        graph_data = humid_data;
        graph_time = humid_time;
        break;
      }
    case "Temperature":
      {
        graph_data = temp_data;
        graph_time = temp_time;
        break;
      }
    case "Light":
      {
        graph_data = light_data;
        graph_time = light_time;
        break;
      }
    case "Moisture":
      {
        graph_data = moist_data;
        graph_time = moist_time;
        break;
      }
    default:
      break;
  }

  return (
    <div>
      <Card className='history'>
        <HistoryFilter
          selected={filteredMonth}
          onChangeFilter={filterChangeHandler}
        />
        <HistoryFilterSubject
          filterName={'Filter by subject'}
          selected={filteredSubject}
          onChangeFilter={subjectFilterChangeHandler}
          values={DB_ENV_NAMES}
        />

        <HistoryFilterSubject
          filterName={'Filter by latest'}
          selected={filteredLatestItems}
          onChangeFilter={latestItemsFilterChangeHandler}
          values={[1,5,10,20,50].map((item)=>(`${item} items`))}
        />

        {filteredSubject!=="All"?
        <>
        <Card className='graph-item'>
          <div className="bg-black">
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