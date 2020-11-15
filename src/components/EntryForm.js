import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));

const EntryForm = ({ createEntry, file, results, notif }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateResults, setUpdateResults] = useState('');
  const [location, setLocation] = useState('');

  const classes = useStyles();

  const addEntry = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append('image', file, file.name);
    fd.append('title', title);
    fd.append('description', description);
    fd.append('location', location);

    updateResults
      ? fd.append('results', updateResults)
      : fd.append('results', JSON.stringify(results));

    console.log(fd);
    createEntry(fd);

    setTitle('');
    setDescription('');
    setUpdateResults('');
    setLocation('');
  };

  return (
    <>
      {notif ? (
        <Alert severity="info">
          <AlertTitle>{notif}</AlertTitle>
        </Alert>
      ) : (
        ''
      )}

      <form id="form" onSubmit={addEntry}>
        <div>
          <TextField
            id="title"
            label="title"
            type="author"
            value={title}
            name="Author"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="description"
            type="text"
            label="description"
            value={description}
            name="Url"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="location"
            label="location"
            type="text"
            value={location}
            name="Url"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="url"
            label="different results? (optional)"
            type="text"
            value={updateResults}
            name="Url"
            onChange={(e) => setUpdateResults(e.target.value)}
          />
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          id="submit"
          type="submit"
          endIcon={<SendRoundedIcon></SendRoundedIcon>}
        >
          submit
        </Button>
      </form>
    </>
  );
};

export default EntryForm;
