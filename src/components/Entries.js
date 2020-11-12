import React from 'react';
import Entry from './Entry';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

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
  },

  loginbtn: {},
}));

const Entries = ({ user, entries, handleLikes, handleDeletion }) => {
  const history = useHistory();

  const pushToLogin = () => {
    history.push('/login');
  };
  const classes = useStyles();
  console.log(`entries: ${JSON.stringify(entries)}`);
  return user ? (
    entries.map((entry) => (
      <Entry
        entry={entry}
        key={entry.id}
        user={user}
        handleDeletion={() => handleDeletion(entry.id)}
        handleLikes={() => handleLikes(entry.id)}
      />
    ))
  ) : (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paperForEntries}>
            <Typography>
              In order to view the entries you have to{' '}
              <Button color="secondary" onClick={pushToLogin}>
                Login
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Entries;
