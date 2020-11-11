import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import PetsRoundedIcon from '@material-ui/icons/PetsRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import IsJason from 'is-json';

import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    alignItems: 'center',
    justify: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular,
    align: 'right',
  },
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  larger: {
    width: theme.spacing(35),

    alignItems: 'center',
    justifyItems: 'center',
  },
  aligner: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
  },
  invisible: {
    opacity: '0',
    overflow: 'hidden',
    transform: 'scale(0)',
  },
  margin: {
    margin: '5px',
  },
}));

const formatResult = ({ className, probability }) => (
  <li text="primary" key={className}>{`${className}: ${(
    probability * 100
  ).toFixed(2)}%`}</li>
);

const Entry = ({ user, entry, handleLikes, handleDeletion }) => {
  const [info, setInfo] = useState('');
  const classes = useStyles();

  const textAreaRef = useRef(null);

  const isJsoned = () =>
    IsJason(entry.results) ? (
      <ul> {JSON.parse(entry.results).map(formatResult)}</ul>
    ) : (
      <p>{entry.results}</p>
    );

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    setInfo(`${entry.user.username} is copied to clipboard!`);
    setTimeout(() => {
      setInfo('');
    }, 2000);

    e.target.focus();
  };

  return (
    <Accordion className={classes.margin}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Avatar alt="Image" src={entry.photoUrl} className={classes.large} />
        <Typography
          className={classes.heading}
          color={
            entry.user.username === user.username ? 'secondary' : 'primary'
          }
        >
          {entry.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <div className={classes.aligner}>
                <img
                  border={5}
                  variant="rounded"
                  alt="Imageofdog"
                  src={entry.photoUrl}
                  className={classes.larger}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              {info ? <Alert severity="info">{info}</Alert> : ''}

              <List
                component="nav"
                className={classes.root}
                aria-label="mailbox folders"
              >
                <ListItem button>
                  <ListItemIcon>
                    <PetsRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={isJsoned()} />
                </ListItem>
                <Divider />
                <ListItem button onClick={copyToClipboard} divider>
                  <ListItemIcon>
                    <MailOutlineRoundedIcon />
                  </ListItemIcon>

                  <ListItemText
                    ref={textAreaRef}
                    primary={entry.user.username}
                    value={entry.user.username}
                    secondary={entry.user.name}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <DescriptionRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={entry.description} />
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemIcon>
                    <LocationOnRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={entry.location} />
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemIcon>
                    <ThumbUpRoundedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={entry.likes}
                    secondary={entry.createdAt}
                  />
                </ListItem>
              </List>

              <Button
                display="inline"
                edge="end"
                color="primary"
                variant="contained"
                aria-label="delete"
                onClick={handleLikes}
              >
                Like
              </Button>

              {entry.user.username === user.username ? (
                <Button
                  variant="contained"
                  color="secondary"
                  id="delete-button"
                  onClick={handleDeletion}
                >
                  {' '}
                  Delete
                </Button>
              ) : (
                ''
              )}
              <input
                readOnly
                className={classes.invisible}
                value={entry.user.username}
                ref={textAreaRef}
              ></input>
            </Grid>
          </Grid>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Entry;

//if (showDetails) {
//  return (
//    <TableContainer>
//      <Table>
//        <TableBody>
//          <TableRow key={entry.id}>
//            <TableCell>
//              {entry.url} {entry.title}
//              <button onClick={handleViewChange}>Show details</button>
//            </TableCell>
//            <TableCell>{entry.user.name}</TableCell>
//          </TableRow>
//        </TableBody>
//      </Table>
//    </TableContainer>
//  );
//} else {
//  return (
//    <div style={entryStyle} className="entry">
//      <div>
//        {entry.photoUrl} {entry.title}
//        <button onClick={handleViewChange}>hide</button>
//        <p>{entry.url}</p>
//        <p className="likes">likes: {entry.likes}</p>
//        <button id="likes-button" onClick={handleLikes}>
//          likeblog
//        </button>
//        <p>{entry.user.username}</p>
//        {entry.user.username === user.username ? (
//          <button id="delete-button" onClick={handleDeletion}>
//            remove
//          </button>
//        ) : (
//          ''
//        )}
//      </div>
//    </div>
//  );
//}
