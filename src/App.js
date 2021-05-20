import React from "react";

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
import Navbar from './Component/Navbars/Navbar'
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
        <PrivateRoute path ="/plant" component={PlantList}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path = "/dashboard/notification" component = {Notification}/>
        <PrivateRoute path="/firebase_test" component={FirebaseTest} />
        {/* <PrivateRoute path="/envcond" component={EnvCond} /> */}
      </Switch>
    </AuthProvider>
    </div>
  );
}