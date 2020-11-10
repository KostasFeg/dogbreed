import React from 'react';
import { TextField, Button } from '@material-ui/core';
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <form onSubmit={handleSubmit}>
    <h1>Log In</h1>
    <div>
      <TextField
        id="standard-basic"
        label="email"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      <TextField
        type="password"
        label="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <Button id="login-button" color="primary" type="submit">
      login
    </Button>
  </form>
);

export default LoginForm;
