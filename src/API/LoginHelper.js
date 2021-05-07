import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

/*
    This is used for routing around private areas !
    When login is pressed, route to needed area.
*/

export default function Login() {
  const { state } = useLocation();
  const { from } = state || { from: { pathname: "/" } };
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true);
    });
  };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}


export function Logout() {
  const { from } = { from: { pathname: "/" } };

  fakeAuth.logout();
  return <Redirect to={from} />;
}

/* A fake authentication function */
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  logout() {
    this.isAuthenticated = false;
  }
};
