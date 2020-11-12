import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const classes = useStyles();
  return (
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
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        id="login-button"
        type="submit"
      >
        login
      </Button>
    </form>
  );
};

export default LoginForm;
