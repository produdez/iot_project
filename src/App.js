import React, { useEffect } from "react";
import mqtt from "mqtt";
import { Link, Route, Switch } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import FirebaseTest from "./Component/FirebaseTest";
import PrivateRoute from "./API/PrivateRouteHelper"
import Login from "./Component/Authentication/Login"
import Signup from "./Component/Authentication/Signup"
import Logout from "./Component/Authentication/Logout"
import { AuthProvider } from "./Context/AuthContext";
import { useAuth } from "./Context/AuthContext"
import Notification from "./Component/Notification"
import Homepage from "./Component/Pages/Homepage"
import PlantList from "./Component/Pages/PlantList";
import EnvCond from "./Component/EnvCond";
import History from "./Component/Pages/HistoryPage"
import Navbar from './Component/Navbars/Navbar'
import NotificationService from './API/NotificationService'

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
const historyData = [
  {id: 1,
  date: new Date(2021, 2,28),
  description:'PUMP!'
  },
  {id: 2,
  date: new Date(2021, 6,28),
  description:'PUMP!'
  },
  {id: 3,
  date: new Date(2021, 7,28),
  description:'PUMP!'
  },
]

export default function App() {
  NotificationService(); //setup notification service
  useEffect(() => {
    const options = {
      username: process.env.REACT_APP_ZYMETH_ADA_ID,
      password: process.env.REACT_APP_ZYMETH_ADA_KEY
    };
    const url = 'tcp://io.adafruit.com:443';

    window.mqttClient = mqtt.connect(url, options);
    window.mqttClient.on('connect', (connack)=>{
      window.mqttClient.subscribe('bkiot/feeds/bk-iot-relay', (err, granted) => {if (err) console.log(err)})
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
      <Navbar></Navbar>
    <AuthProvider>  
      <Switch>
        <Route exact path="/"><Homepage /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/signup"><Signup /></Route>
        <Route path="/logout"><Logout /></Route>
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