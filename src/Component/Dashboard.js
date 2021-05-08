// // src/Category.js

// import React from "react";
// import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

// //! ITEM IS JUST DUMMY PAGE
// const Item = () => {
//   const { name } = useParams();

//   return (
//     <div>
//       <h3>{name}</h3>
//     </div>
//   );
// }

// const UserHome = () => {
//   const { url, path } = useRouteMatch();

//   return (
//     <div>
//     <h2>{'User Menu'}</h2>
//       <ul>
//         <li>
//           <Link to={`${url}/plants`}>Plants</Link>
//         </li>
//         <li>
//           <Link to={`${url}/notification`}>Notification</Link>
//         </li>
//         <li>
//           <Link to={`${url}/history`}>History</Link>
//         </li>
//       </ul>
//       <Route path={`${path}/:name`}>
//         <Item />
//       </Route>
//     </div>
//   );
// };

// export default UserHome;




import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../Context/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>User:</strong> {currentUser.email}
          <h3> This is your garden!</h3>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}