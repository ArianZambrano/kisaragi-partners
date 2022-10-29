import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <div className="login-header">
        <h2 className="login-title">Kisaragi Partners</h2>
        <img src="../kisaragi.jpeg" alt="kisaragi"/>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <div className="p-2">
            <Form.Label style={{fontWeight: 'bold'}}>Username</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <div className="p-2">
            <Form.Label style={{fontWeight: 'bold'}}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Form.Group>
        <div className="actions-container">
          <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
          <a href="">Registre su tienda</a>
        </div>
      </Form>
    </div>
  );
}