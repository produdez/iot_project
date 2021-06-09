import React from "react";
//import mqtt from "mqtt";
import { AuthProvider } from "./Context/AuthContext";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import FirebaseTest from "./Component/FirebaseTest";
import PrivateRoute from "./API/PrivateRouteHelper"
import Login from "./Component/Authentication/Login"
import Signup from "./Component/Authentication/Signup"
import { useAuth } from "./Context/AuthContext"
import Notification from "./Component/Notification"
import Homepage from "./Component/Pages/Homepage"
import PlantList from "./Component/Pages/PlantList";
import EnvCond from "./Component/EnvCond";
import History from "./Component/Pages/HistoryPage"
import Navbar from './Component/Navbars/Navbar'
import setupAdaMqttClient from "./API/adafruit";
import  { useState , useEffect, useRef} from "react"
import SelectHistory from "./Component/Pages/selectHistory"
import WateringHistory from "./Component/Pages/WateringHistory"
const historyData = [
  {
    id: 'e1',
    description:'TEXT(Environment condition)',
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', description: 'TEXT(Environment condition)', date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    description:'TEXT(Environment condition)',
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    description:'TEXT(Environment condition)',
    date: new Date(2021, 5, 12),
  },
];
const wateringData = [
  {
    id: 'e1',
    description:'Description',
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', description: 'Description', date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    description:'Description',
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    description:'Description',
    date: new Date(2021, 5, 12),
  },
];


export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setupAdaMqttClient().then(()=>{
      setLoading(false)
    })
  }, []) // <-- empty dependency array
  

  if (loading){
    return <h1>Loading Server Authentication Data!</h1>
  }
  return (
    <div>
    <AuthProvider>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/"><Homepage /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/signup"><Signup /></Route>
        <Route path="/envhistory"><History items={historyData}/></Route>
        <Route path="/wathistory"><WateringHistory items={wateringData}/></Route>
        <Route path="/sehistory"><SelectHistory/></Route>
        <PrivateRoute path ="/plant" component={PlantList}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path = "/notification" component = {Notification}/>
        <PrivateRoute path="/firebase_test" component={FirebaseTest} />
        <PrivateRoute path="/envcond" component={EnvCond} />
      </Switch>
    </AuthProvider>
    </div>
  );
}