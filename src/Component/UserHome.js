// src/Category.js

import React from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

//! ITEM IS JUST DUMMY PAGE
const Item = () => {
  const { name } = useParams();

  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
}

const UserHome = () => {
  const { url, path } = useRouteMatch();

  return (
    <div>
    <h2>{'User Menu'}</h2>
      <ul>
        <li>
          <Link to={`${url}/plants`}>Plants</Link>
        </li>
        <li>
          <Link to={`${url}/notification`}>Notification</Link>
        </li>
        <li>
          <Link to={`${url}/history`}>History</Link>
        </li>
      </ul>
      <Route path={`${path}/:name`}>
        <Item />
      </Route>
    </div>
  );
};

export default UserHome;