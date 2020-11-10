import React from 'react';
import { TextField, Button } from '@material-ui/core';

const SignUpForm = ({
  handleSubmit,
  handleSignUsernameChange,
  handleSignPasswordChange,
  handleSignNameChange,
  handleConfirmPasswordChange,
  signUsername,
  signName,
  signPassword,
  confirmPassword,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign-Up</h1>
      <div>
        <TextField
          id="mail"
          type="email"
          label="email"
          value={signUsername}
          name="Username"
          onChange={handleSignUsernameChange}
        />
      </div>
      <div>
        <TextField
          id="name"
          type="text"
          label="name"
          value={signName}
          name="name"
          onChange={handleSignNameChange}
        />
      </div>
      <div>
        <TextField
          type="password"
          id="password"
          label="password"
          value={signPassword}
          name="Password"
          onChange={handleSignPasswordChange}
        />
      </div>
      <div>
        <TextField
          type="password"
          id="confirmpass"
          label="confirm password"
          value={confirmPassword}
          name="Password"
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <Button id="login-button" type="submit">
        Sign-Up
      </Button>
    </form>
  );
};

export default SignUpForm;
