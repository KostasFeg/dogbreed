import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Toolbar, AppBar, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Recognition from './components/Recognition';
import Footer from './components/Footer';
import Entries from './components/Entries';
import UserInfo from './components/UserInfo';
import loginService from './services/login';
import entryService from './services/entries';
import { Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rooted: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  pagination: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
  },
  paginator: {
    alignItems: 'center',
    justifyItems: 'center',
  },
  centerAlignment: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  centerAlignmentBot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  center: {},
  end: {
    height: '100%',
  },
  toolbarSettings: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  flexstart: {},
}));

const App = () => {
  let [entries, setEntries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notificationSeverity, setNotificationSeverity] = useState(null);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const [curName, setCurName] = useState('');

  const icon = !darkMode ? (
    <Brightness7RoundedIcon />
  ) : (
    <Brightness4RoundedIcon />
  );

  useEffect(() => {
    entryService
      .getAll(page, limit, query, curName)
      .then((entries) => setEntries(entries.results));
  }, [page, limit, query, curName]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      entryService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      entryService.setToken(user.token);
      setUser(user);

      setNotificationSeverity('success');
      setNotification(`Welcome ${user.name}!`);

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setNotificationSeverity('warning');
      setNotification(`wrong mail or password`);

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const addEntry = (entryObject) => {
    entryService
      .create(entryObject)
      .then((returnedObject) => {
        setEntries([...entries, returnedObject]);
        setNotificationSeverity('success');
        setNotification(`New entry ${returnedObject.title}!`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setNotificationSeverity('warning');
        setNotification(err.response.data.error);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const handleLikes = (id) => {
    const entry = entries.find((entry) => entry.id === id);
    const likedEntry = { ...entry, likes: entry.likes + 1 };
    entryService.update(id, likedEntry).then(() => {
      setEntries(
        entries.map((entry) => (entry.id !== id ? entry : likedEntry))
      );
    });
  };

  const handleDeletion = (id) => {
    const entryToBeDeleted = entries.find((blog) => blog.id === id);
    if (window.confirm(`Remove ${entryToBeDeleted.title}?`)) {
      entryService.deleted(id).then(() => {
        setEntries(entries.filter((blog) => blog !== entryToBeDeleted));
      });
    }
  };

  const handleCheckBox = () => {
    if (!curName) return setCurName(user.username);
    setCurName('');
  };

  const handlePagination = (e) => {
    setLimit(e);
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position="static">
          <Toolbar className={classes.toolbarSettings}>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/entries">
              entries
            </Button>
            <Button
              className={classes.loginbtn}
              color="inherit"
              component={Link}
              to="/login"
            >
              {user ? (
                <Avatar className={classes.orange}>
                  {user.name.substring(0, 2)}
                </Avatar>
              ) : (
                'login/sign-up'
              )}
            </Button>

            <IconButton
              edge="end"
              color="inherit"
              aria-label="mode"
              onClick={() => setDarkMode(!darkMode)}
            >
              {icon}
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.rooted}>
          {notification && (
            <Alert variant="filled" severity={notificationSeverity}>
              <AlertTitle>{notification}</AlertTitle>
            </Alert>
          )}
        </div>
        <Switch>
          <Route path="/entries">
            {user ? (
              <div className={classes.centerAlignment}>
                <ButtonGroup
                  className={classes.center}
                  variant="text"
                  color="secondary"
                  aria-label="contained primary button group"
                >
                  <Button onClick={() => handlePagination(5)}>5</Button>
                  <Button onClick={() => handlePagination(10)}>10</Button>
                  <Button onClick={() => handlePagination(15)}>15</Button>
                </ButtonGroup>
                <form className={classes.end} noValidate autoComplete="off">
                  <TextField
                    color="secondary"
                    id="Search"
                    label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </form>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCheckBox}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="current user results"
                />
              </div>
            ) : (
              ''
            )}

            <Entries
              key={user}
              user={user}
              entries={entries}
              handleLikes={handleLikes}
              handleDeletion={handleDeletion}
            />
            {user ? (
              <div className={classes.centerAlignmentBot}>
                <Pagination
                  className={classes.paginator}
                  align="center"
                  count={10}
                  page={page}
                  onChange={handleChange}
                  defaultPage={1}
                />
              </div>
            ) : (
              ''
            )}
          </Route>
          <Route path="/login">
            <UserInfo user={user} logOut={logOut} handleLogin={handleLogin} />
          </Route>
          <Route path="/">
            <Recognition user={user} createEntry={addEntry} />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
