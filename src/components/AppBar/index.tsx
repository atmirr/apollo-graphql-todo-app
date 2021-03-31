import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AssignmentTurnedIn as TodoIcon } from '@material-ui/icons';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  appBar: {
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing(0.5),
  },
}));

function AppBar() {
  const classes = useStyles();
  return (
    <MuiAppBar position="static" className={classes.appBar}>
      <Toolbar>
        <TodoIcon className={classes.icon} />
        <Typography variant="h5">Todo List</Typography>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
