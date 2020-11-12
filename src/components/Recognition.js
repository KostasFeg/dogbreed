import React, { useReducer, useRef, useState } from 'react';
import EntryForm from './EntryForm';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import dogwalking from '../illustrations/dogwalk2.svg';
import petadoption from '../illustrations/petadoption.svg';
import dogwalking2 from '../illustrations/dogwalking.svg';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '200px',
  },
  paperforHero: {
    marginTop: '10px',
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '30vh',
    //backgroundImage:
    //'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCA0MCw0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDMxNCkiPjxyZWN0IGlkPSJwYXR0ZXJuLWJhY2tncm91bmQiIHdpZHRoPSI0MDAlIiBoZWlnaHQ9IjQwMCUiIGZpbGw9InJnYmEoMjUwLCAyNTAsIDI1MCwxKSI+PC9yZWN0PiA8Y2lyY2xlIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNjMsIDgxLCAxODEsMSkiIGN4PSI0MCIgY3k9IjIwIiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgZmlsdGVyPSJ1cmwoI2ZpbHRlcjFwYXR0ZXJuKSIgZmlsbD0icmdiYSg2MywgODEsIDE4MSwxKSIgY3g9IjAiIGN5PSIyMCIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNjMsIDgxLCAxODEsMSkiIGN4PSIyLjEwNTI2MzE1Nzg5NDczNjciIGN5PSIyMCIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNjMsIDgxLCAxODEsMSkiIGN4PSI0LjIxMDUyNjMxNTc4OTQ3MzUiIGN5PSIyMCIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNjMsIDgxLCAxODEsMSkiIGN4PSI2LjMxNTc4OTQ3MzY4NDIxMSIgY3k9IjIwIiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgZmlsdGVyPSJ1cmwoI2ZpbHRlcjFwYXR0ZXJuKSIgZmlsbD0icmdiYSg2MywgODEsIDE4MSwxKSIgY3g9IjguNDIxMDUyNjMxNTc4OTQ3IiBjeT0iMjAiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBmaWx0ZXI9InVybCgjZmlsdGVyMXBhdHRlcm4pIiBmaWxsPSJyZ2JhKDYzLCA4MSwgMTgxLDEpIiBjeD0iMTAuNTI2MzE1Nzg5NDczNjgzIiBjeT0iMjAiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBmaWx0ZXI9InVybCgjZmlsdGVyMXBhdHRlcm4pIiBmaWxsPSJyZ2JhKDYzLCA4MSwgMTgxLDEpIiBjeD0iMTIuNjMxNTc4OTQ3MzY4NDIxIiBjeT0iMjAiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBmaWx0ZXI9InVybCgjZmlsdGVyMXBhdHRlcm4pIiBmaWxsPSJyZ2JhKDYzLCA4MSwgMTgxLDEpIiBjeD0iMTQuNzM2ODQyMTA1MjYzMTU4IiBjeT0iMjAiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBmaWx0ZXI9InVybCgjZmlsdGVyMXBhdHRlcm4pIiBmaWxsPSJyZ2JhKDYzLCA4MSwgMTgxLDEpIiBjeD0iMTYuODQyMTA1MjYzMTU3ODk0IiBjeT0iMjAiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBmaWx0ZXI9InVybCgjZmlsdGVyMXBhdHRlcm4pIiBmaWxsPSJyZ2JhKDYzLCA4MSwgMTgxLDEpIiBjeD0iMTguOTQ3MzY4NDIxMDUyNjMiIGN5PSIyMCIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNjMsIDgxLCAxODEsMSkiIGN4PSIyMS4wNTI2MzE1Nzg5NDczNjYiIGN5PSIyMCIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNjMsIDgxLCAxODEsMSkiIGN4PSIyMy4xNTc4OTQ3MzY4NDIxMDMiIGN5PSIyMCIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNjMsIDgxLCAxODEsMSkiIGN4PSIyNS4yNjMxNTc4OTQ3MzY4NDIiIGN5PSIyMCIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNjMsIDgxLCAxODEsMSkiIGN4PSIyNy4zNjg0MjEwNTI2MzE1OCIgY3k9IjIwIiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgZmlsdGVyPSJ1cmwoI2ZpbHRlcjFwYXR0ZXJuKSIgZmlsbD0icmdiYSg2MywgODEsIDE4MSwxKSIgY3g9IjI5LjQ3MzY4NDIxMDUyNjMxNSIgY3k9IjIwIiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgZmlsdGVyPSJ1cmwoI2ZpbHRlcjFwYXR0ZXJuKSIgZmlsbD0icmdiYSg2MywgODEsIDE4MSwxKSIgY3g9IjMxLjU3ODk0NzM2ODQyMTA1IiBjeT0iMjAiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBmaWx0ZXI9InVybCgjZmlsdGVyMXBhdHRlcm4pIiBmaWxsPSJyZ2JhKDYzLCA4MSwgMTgxLDEpIiBjeD0iMzMuNjg0MjEwNTI2MzE1NzkiIGN5PSIyMCIgcj0iMC41Ij48L2NpcmNsZT48Y2lyY2xlIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNjMsIDgxLCAxODEsMSkiIGN4PSIzNS43ODk0NzM2ODQyMTA1MyIgY3k9IjIwIiByPSIwLjUiPjwvY2lyY2xlPjxjaXJjbGUgZmlsdGVyPSJ1cmwoI2ZpbHRlcjFwYXR0ZXJuKSIgZmlsbD0icmdiYSg2MywgODEsIDE4MSwxKSIgY3g9IjM3Ljg5NDczNjg0MjEwNTI2IiBjeT0iMjAiIHI9IjAuNSI+PC9jaXJjbGU+PGNpcmNsZSBmaWx0ZXI9InVybCgjZmlsdGVyMnBhdHRlcm4pIiBmaWxsPSJyZ2JhKDI0NSwgMCwgODcsMSkiIGN4PSIwIiBjeT0iMjAiIHI9IjQiPjwvY2lyY2xlPjxjaXJjbGUgZmlsdGVyPSJ1cmwoI2ZpbHRlcjJwYXR0ZXJuKSIgZmlsbD0icmdiYSgyNDUsIDAsIDg3LDEpIiBjeD0iNDAiIGN5PSIyMCIgcj0iNCI+PC9jaXJjbGU+PC9wYXR0ZXJuPiA8ZmlsdGVyIGlkPSJmaWx0ZXIxcGF0dGVybiI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwIDAuMDEiIG51bU9jdGF2ZXM9IjIiIHJlc3VsdD0icmVzdWx0MSI+PC9mZVR1cmJ1bGVuY2U+PGZlRGlzcGxhY2VtZW50TWFwIGluMj0icmVzdWx0MSIgc2NhbGU9IjEiIHJlc3VsdD0icmVzdWx0MiIgeENoYW5uZWxTZWxlY3Rvcj0iUiIgaW49IlNvdXJjZUdyYXBoaWMiIHlDaGFubmVsU2VsZWN0b3I9IkciPjwvZmVEaXNwbGFjZW1lbnRNYXA+PGZlQ29tcG9zaXRlIGluMj0icmVzdWx0MiIgaW49IlNvdXJjZUdyYXBoaWMiIG9wZXJhdG9yPSJhdG9wIiByZXN1bHQ9ImNvbXBvc2l0ZUdyYXBoaWMiPjwvZmVDb21wb3NpdGU+PGZlT2Zmc2V0IGluPSJjb21wb3NpdGVHcmFwaGljIiByZXN1bHQ9ImZiU291cmNlR3JhcGhpYyIgZHk9Ii0wLjEiPjwvZmVPZmZzZXQ+PC9maWx0ZXI+IDxmaWx0ZXIgaWQ9ImZpbHRlcjJwYXR0ZXJuIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjAgMC4wMSIgbnVtT2N0YXZlcz0iMiIgcmVzdWx0PSJyZXN1bHQxIj48L2ZlVHVyYnVsZW5jZT48ZmVEaXNwbGFjZW1lbnRNYXAgaW4yPSJyZXN1bHQxIiBzY2FsZT0iMSIgcmVzdWx0PSJyZXN1bHQyIiB4Q2hhbm5lbFNlbGVjdG9yPSJSIiB5Q2hhbm5lbFNlbGVjdG9yPSJHIiBpbj0iU291cmNlR3JhcGhpYyI+PC9mZURpc3BsYWNlbWVudE1hcD48ZmVDb21wb3NpdGUgaW4yPSJyZXN1bHQyIiBpbj0iU291cmNlR3JhcGhpYyIgb3BlcmF0b3I9ImF0b3AiIHJlc3VsdD0iY29tcG9zaXRlR3JhcGhpYyI+PC9mZUNvbXBvc2l0ZT48ZmVPZmZzZXQgaW49ImNvbXBvc2l0ZUdyYXBoaWMiIHJlc3VsdD0iZmJTb3VyY2VHcmFwaGljIiBkeT0iLTAuMSI+PC9mZU9mZnNldD48L2ZpbHRlcj48L2RlZnM+IDxyZWN0IGZpbGw9InVybCgjcGF0dGVybikiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiPjwvcmVjdD48L3N2Zz4=")',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  typographyStyle: {
    marginTop: '3vh',
    color: 'primary',
  },
  imageResizing: {
    width: '280px',
  },
  modelImageResize: {
    width: theme.spacing(35),
    marginTop: '20px',
  },
  list: {
    listStyle: 'none',
  },
  aligner: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
  },
}));

const svgList = [dogwalking, dogwalking2, petadoption];
const item = svgList[Math.floor(Math.random() * svgList.length)];

const stateMachine = {
  initial: 'initial',
  states: {
    initial: { on: { next: 'loadingModel' } },
    loadingModel: { on: { next: 'awaitingUpload' } },
    awaitingUpload: { on: { next: 'ready' } },
    ready: { on: { next: 'classifying' }, showImage: true },
    classifying: { on: { next: 'complete' } },
    complete: {
      on: { next: 'awaitingUpload' },
      showImage: true,
      showResults: true,
    },
  },
};

const reducer = (currentState, event) =>
  stateMachine.states[currentState].on[event] || stateMachine.initial;

const formatResult = ({ className, probability }) => (
  <List key={className}>
    <ListItem key={className} button divider>
      <ListItemText
        key={className}
        primary={className}
        secondary={(probability * 100).toFixed(2)}
      />
    </ListItem>
  </List>
);

const getSteps = () => {
  return ['Load the model', 'Insert your image', 'Let the tool do its job!'];
};

const getStepContent = () => {
  return [
    'The model is needed to identify',
    'You can even use your phone camera!',
    'Get the results and even save them',
  ];
};

const Recognition = ({ user, createEntry }) => {
  tf.setBackend('cpu');
  const [state, dispatch] = useReducer(reducer, stateMachine.initial);
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState('');

  const history = useHistory();

  const steps = getSteps();

  const inputRef = useRef();
  const imgRef = useRef();
  const next = () => dispatch('next');

  const loadModel = async () => {
    next();
    setProgress(20);

    const mobilenetModel = await mobilenet.load();
    setModel(mobilenetModel);
    next();
    setProgress(40);
  };

  const handleUpload = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);

      setFile(files[0]);

      next();
      setProgress(60);
      setActiveStep(1);
    }
  };

  const identify = async () => {
    setActiveStep(2);
    next();
    setProgress(80);

    const results = await model.classify(imgRef.current);
    setResults(results);

    next();
    setProgress(100);
    setActiveStep(3);
  };

  const reset = () => {
    setResults([]);
    setImageUrl(null);

    next();
    setProgress(60);
  };

  const buttonProps = {
    initial: { text: 'Load Model', action: loadModel },
    loadingModel: { text: 'Loading Model...', action: () => {} },
    awaitingUpload: {
      text: 'Upload Photo',
      action: () => inputRef.current.click(),
    },
    ready: { text: 'Identify', action: identify },
    classifying: { text: 'Identifying', action: () => {} },
    complete: { text: 'Reset', action: reset },
  };

  const pushToLogin = () => {
    history.push('/login');
  };

  const { showImage = false, showResults = false } = stateMachine.states[state];

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paperforHero}>
            <Typography variant="h2" className={classes.typographyStyle}>
              Dog Shelter
            </Typography>
            <Typography variant="h6">A better place for strays</Typography>
            <img
              className={classes.imageResizing}
              alt="dog walking"
              src={item}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>{getStepContent(index)}</StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <LinearProgress variant="determinate" value={progress} />
            <div className="model-img">
              {showImage && (
                <img
                  border={1}
                  className={classes.modelImageResize}
                  alt="preview"
                  src={imageUrl}
                  ref={imgRef}
                />
              )}
            </div>
            <input
              className="toBeHidden"
              type="file"
              accept="image/*"
              capture="camera"
              ref={inputRef}
              onChange={handleUpload}
            />

            <div className={classes.aligner}>
              {showResults && results.map(formatResult)}
            </div>
            <div className="modelbtn">
              <Button
                variant="outlined"
                color="primary"
                onClick={buttonProps[state].action}
              >
                {buttonProps[state].text}
              </Button>
              {showResults && user ? (
                <EntryForm
                  createEntry={createEntry}
                  file={file}
                  results={results}
                />
              ) : (
                ''
              )}
            </div>
            {user ? (
              ''
            ) : (
              <div>
                <p>
                  In order to save the results you have to{' '}
                  <Button color="primary" onClick={pushToLogin}>
                    Login
                  </Button>
                </p>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Recognition;
