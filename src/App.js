// import logo from './logo.svg';
// import './App.css';

// import {
//   Route,
//   Link
// } from "react-router-dom";

// function App() {
//   return (
//     <div>
//     <h1>Application Routing Menu</h1>
//     <ul role="navigation">
//       <li><Link to="/client">Client Side</Link></li>
//       <li><Link to="/server">Server Side</Link></li>
//     </ul>
     
//     <div>
//       <Route path='/client' component={Client} />
//       <Route path='/server' component={Server} />
//     </div>
//   </div>
//   );
// }

// export default App;

// const Client= () => <h3>What is client side?<body><li>Browser</li><li>Runs on local machine</li><li>React renders user interface</li><li>React Router adds clickable links</li></body></h3>

// const Server= () => <h3>What is server side?<li>node.js - JavaScript everywhere!</li></h3>



import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import UserHome from "./Component/UserHome";
import PrivateRoute from "./API/PrivateRouteHelper"
import Login from "./API/LoginHelper"
import {Logout} from "./API/LoginHelper"
const Home = () => (
  <div>
    <h2>Welcome to our app</h2>
  </div>
);


export default function App() {
  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user_home">User Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/login"><Login /></Route>
        <PrivateRoute path="/user_home" component={UserHome} />
        <Route path = "/logout"><Logout /></Route>
      </Switch>
    </div>
  );
}