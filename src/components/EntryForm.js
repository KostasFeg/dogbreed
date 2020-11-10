import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const EntryForm = ({ createEntry, file, results }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateResults, setUpdateResults] = useState('');
  const [location, setLocation] = useState('');

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
      <Button id="submit" type="submit">
        submit
      </Button>
    </form>
  );
};

export default EntryForm;
