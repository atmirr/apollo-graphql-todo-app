import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper, Typography, Container } from '@material-ui/core';
import AppBar from './components/AppBar';
import AddNewTask from './components/AddNewTask';
import TasksList from './components/TasksList';

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: palette.grey[200],
  },
  main: {
    marginTop: spacing(5),
    marginBottom: spacing(2),
    padding: spacing(3),
  },
  title: {
    fontSize: typography.pxToRem(40),
    fontWeight: typography.fontWeightLight,
    color: palette.grey[700],
  },
  footer: {
    textAlign: 'center',
    padding: spacing(3, 2),
    marginTop: 'auto',
  },
}));

function Copyright() {
  return (
    <Typography variant="subtitle2" color="textSecondary">
      {'Copyright ©Tal&Dev '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Main() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <Container component="main" maxWidth="md">
        <Paper elevation={2} className={classes.main}>
          <Typography component="h1" gutterBottom className={classes.title}>
            🚀 My Tasks
          </Typography>
          <AddNewTask />
          <TasksList />
        </Paper>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default Main;
