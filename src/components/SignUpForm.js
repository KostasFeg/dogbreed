import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

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
  const classes = useStyles();
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
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        id="login-button"
        type="submit"
      >
        Sign-Up
      </Button>
    </form>
  );
};

export default SignUpForm;
