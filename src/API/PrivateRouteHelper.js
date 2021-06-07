import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        // console.log('Current user: ',currentUser);
        if (currentUser){
          // console.log('Passed auth test!');
          return <Component {...props} />
        }
        console.log('Redirected to Login!');
        return <Redirect to="/login" />
      }}
    ></Route>
  )
}