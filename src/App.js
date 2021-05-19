import React, { useEffect } from "react";
import mqtt from "mqtt";
import { Link, Route, Switch } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import FirebaseTest from "./Component/FirebaseTest";
import PrivateRoute from "./API/PrivateRouteHelper"
import Login from "./Component/Authentication/Login"
import Signup from "./Component/Authentication/Signup"
import { AuthProvider } from "./Context/AuthContext";
import { useAuth } from "./Context/AuthContext"
import Notification from "./Component/Notification"
import Homepage from "./Component/Pages/Homepage"
import PlantList from "./Component/Pages/PlantList";

// function Home(){
//   const { currentUser } = useAuth()
//   const promtLogin = () => {
//     if (currentUser) {
//       return "Login or Signup";
//     } else {
//       return "Go to Dashboard for your garden!";
//     }
//   }
//   return (
//     <div>
//       <h1> Welcome to our Website</h1>
//       {promtLogin()}
//     </div>
//   );
// } 

export default function App() {
  useEffect(() => {
    const options = {
      username: process.env.REACT_APP_ZYMETH_ADA_ID,
      password: process.env.REACT_APP_ZYMETH_ADA_KEY
    };
    const url = 'tcp://io.adafruit.com:443';

    window.mqttClient = mqtt.connect(url, options);
    window.mqttClient.on('connect', (connack)=>{
      window.mqttClient.subscribe('zymeth/feeds/bk-iot-relay', (err, granted) => {if (err) console.log(err)})
      console.log('connect to adafruit successfully')
    })
    
  })
  return (
    <div>
      {/* <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Welcome</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/firebase_test"> Firebase test </Link>
          </li>
          <li>
            <Link to="/signup"> Sign Up </Link>
          </li>
        </ul>
      </nav> */}
    <AuthProvider>  
      <Switch>
        <Route exact path="/"><Homepage /></Route>
        <Route exact path ="/plant"><PlantList /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/signup"><Signup /></Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path = "/dashboard/notification" component = {Notification}/>
        <PrivateRoute path="/firebase_test" component={FirebaseTest} />
      </Switch>
    </AuthProvider>
    </div>
  );
}