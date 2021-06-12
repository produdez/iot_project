import React from "react";
//import mqtt from "mqtt";
import { AuthProvider } from "./Context/AuthContext";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import FirebaseTest from "./Component/FirebaseTest";
import PrivateRoute from "./API/PrivateRouteHelper"
import Login from "./Component/Authentication/Login"
import Signup from "./Component/Authentication/Signup"
import Homepage from "./Component/Pages/Homepage"
import Navbar from './Component/Navbars/Navbar'
import setupAdaMqttClient from "./API/adafruit";
import  { useState , useEffect, useRef} from "react"




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
        <PrivateRoute path="/firebase_test" component={FirebaseTest} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </AuthProvider>
    </div>
  );
}