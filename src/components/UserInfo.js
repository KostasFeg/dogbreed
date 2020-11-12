import React, { useState } from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';
import signUpService from '../services/signUp';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deepOrange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rooted: {
    width: '100%',
    '& > * + *': {
      marginTop: '10px',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperForEntries: {
    marginTop: '10px',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '300px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:
      'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjcyIiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgNDAsNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMjcpIj48cmVjdCBpZD0icGF0dGVybi1iYWNrZ3JvdW5kIiB3aWR0aD0iNDAwJSIgaGVpZ2h0PSI0MDAlIiBmaWxsPSJyZ2JhKDYzLCA4MSwgMTgxLDEpIj48L3JlY3Q+IDxjaXJjbGUgZmlsbD0icmdiYSgyMTQsIDI0LCAyNTEsMSkiIGN4PSI1IiBjeT0iMzEiIHI9IjEuNSI+PC9jaXJjbGU+PGNpcmNsZSBmaWxsPSJyZ2JhKDIxNCwgMjQsIDI1MSwxKSIgY3g9IjI1IiBjeT0iOSIgcj0iMS41Ij48L2NpcmNsZT48Y2lyY2xlIGZpbGw9InJnYmEoMjE0LCAyNCwgMjUxLDEpIiBjeD0iNSIgY3k9Ii05IiByPSIxLjUiPjwvY2lyY2xlPjxjaXJjbGUgZmlsbD0icmdiYSgyMTQsIDI0LCAyNTEsMSkiIGN4PSIyNSIgY3k9IjQ5IiByPSIxLjUiPjwvY2lyY2xlPjxjaXJjbGUgZmlsbD0icmdiYSgxMjcsIDExOCwgMTIxLDEpIiBjeD0iMTUiIGN5PSIyMCIgcj0iMi43NSI+PC9jaXJjbGU+PGNpcmNsZSBmaWxsPSJyZ2JhKDEyNywgMTE4LCAxMjEsMSkiIGN4PSIzNSIgY3k9IjIwIiByPSIyLjc1Ij48L2NpcmNsZT48L3BhdHRlcm4+ICA8L2RlZnM+IDxyZWN0IGZpbGw9InVybCgjcGF0dGVybikiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiPjwvcmVjdD48L3N2Zz4=")',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  loginbtn: {},
  margin: {
    marginTop: '10px',
  },
}));

const UserInfo = ({ user, logOut, handleLogin }) => {
  const [signUpToggle, setSignUpToggle] = useState(true);
  const [signUsername, setSignUsername] = useState('');
  const [signName, setSignName] = useState('');
  const [signPassword, setSignPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationSeverity, setNotificationSeverity] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const showSignUp = () => {
    setSignUpToggle(!signUpToggle);
  };

  const handleProperSignup = (event) => {
    event.preventDefault();
    if (confirmPassword === signPassword) {
      handleSignup();
    } else {
      setNotificationSeverity('warning');
      setNotification('Passwords do not match');
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleSignup = async () => {
    try {
      await signUpService.signUp({
        username: signUsername,
        name: signName,
        password: signPassword,
      });

      setNotification('New account successfully created!');

      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setSignUsername('');
      setSignPassword('');
      setSignName('');
      setConfirmPassword('');
    } catch (error) {
      setNotificationSeverity('warning');
      setNotification(error.response.data.error);

      setTimeout(() => {
        setNotification(null);
      }, 5000);
      console.log(error.response.data.error);
    }
  };

  const signUp = () => (
    <SignupForm
      signUsername={signUsername}
      signName={signName}
      signPassword={signPassword}
      confirmPassword={confirmPassword}
      handleSignUsernameChange={({ target }) => setSignUsername(target.value)}
      handleSignNameChange={({ target }) => setSignName(target.value)}
      handleSignPasswordChange={({ target }) => setSignPassword(target.value)}
      handleConfirmPasswordChange={({ target }) =>
        setConfirmPassword(target.value)
      }
      handleSubmit={handleProperSignup}
    />
  );

  const loginHandler = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
  };

  const login = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={loginHandler}
    />
  );

  const classes = useStyles();

  return user ? (
    <Accordion className={classes.margin}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          {user.name}' profile
          <Button onClick={logOut}>LogOut</Button>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List
          component="nav"
          className={classes.root}
          aria-label="mailbox folders"
        >
          <ListItem button>
            <ListItemIcon>
              <CalendarTodayRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'account created:'}
              secondary={dayjs(user.date).format('DD/MM/YYYY  HH:mm:ss')}
            />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemIcon>
              <FormatListNumberedRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'number of entries'}
              secondary={user.entries.length}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FaceRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={'name'} secondary={user.username} />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  ) : (
    <div className={classes.root}>
      <Grid className={classes.margin} container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            {login()}
            you don' t have an account?
            <Button color="secondary" onClick={showSignUp}>
              Sign-Up
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          {notification && (
            <Alert variant="filled" severity={notificationSeverity}>
              <AlertTitle>{notification}</AlertTitle>
            </Alert>
          )}
          {signUpToggle ? (
            ''
          ) : (
            <Paper className={classes.paper}>{signUp()}</Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default UserInfo;
