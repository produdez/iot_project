import React from "react";
//import mqtt from "mqtt";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import FirebaseTest from "./Component/FirebaseTest";
import PrivateRoute from "./API/PrivateRouteHelper"
import Login from "./Component/Authentication/Login"
import Signup from "./Component/Authentication/Signup"
import { AuthProvider } from "./Context/AuthContext";
//import { useAuth } from "./Context/AuthContext"
import Notification from "./Component/Notification"
import Homepage from "./Component/Pages/Homepage"
import PlantList from "./Component/Pages/PlantList";
import EnvCond from "./Component/EnvCond";
import History from "./Component/Pages/HistoryPage"
import Navbar from './Component/Navbars/Navbar'
import setupAdaMqttClient from "./API/adafruit";
import  { useState , useEffect} from "react"

const historyData = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
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
      <Navbar></Navbar>
    <AuthProvider>  
      <Switch>
        <Route exact path="/"><Homepage /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/signup"><Signup /></Route>
        <Route path="/history"><History items={historyData}/></Route>
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