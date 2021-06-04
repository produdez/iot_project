import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../Context/AuthContext"
import { Link, useHistory,  Redirect } from "react-router-dom"
import Navbar from "../Navbars/Navbar"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const { currentUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

 function handleSubmit(e) {
    e.preventDefault()
    try {
      localStorage.setItem("user-info",JSON.stringify(emailRef.current.value))
      window.location.reload(false)
      setError("")
      setLoading(true)
      login(emailRef.current.value, passwordRef.current.value)
      localStorage.setItem("user-info",JSON.stringify(emailRef.current.value))
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  if (localStorage.getItem("user-info")) {
    return <Redirect to="/"/>
  }

  return (
    <>
    <Card className="card border-dark mb-10 text-black p-3" style={{width : "28rem", margin: "0 auto"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label style={{textAlign : "left"}}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <div className="w-100 text-center mt-2">
            <Button disabled={loading} className="btn btn-green btn-lg btn-block " type="submit" >
              Log In
            </Button>
            </div>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      </Card.Body>
    </Card>
    </>
  )
}

