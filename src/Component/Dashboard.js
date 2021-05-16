
import React, { useState } from "react"
import { Card, Button, Alert, ListGroup } from "react-bootstrap"
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

      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">User Menu</h3>
          <ListGroup>
            <ListGroup.Item><Link to="/dashboard/notification">Notification</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/dashboard/plants">Plants</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/dashboard/activation-history">Usage History</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/EnvCond">Environment Condition</Link></ListGroup.Item>
          </ListGroup>
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