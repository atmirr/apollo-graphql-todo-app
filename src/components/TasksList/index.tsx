import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import TASKS from 'src/graphql/queries/tasks';
import GET_MAIN_TASKS from 'src/graphql/queries/getMainTasks';
import TaskItem from './components/TaskItem';
import { TaskType } from 'src/types';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    width: '100%',
    paddingTop: spacing(5),
    backgroundColor: palette.background.paper,
  },
}));

function TasksList() {
  const classes = useStyles();
  useQuery(TASKS);
  const { data } = useQuery(GET_MAIN_TASKS);
  return data ? (
    <List component="nav" className={classes.root}>
      {data.readMainTasks.map(({ id, title, completed }: TaskType) => (
        <TaskItem key={id} id={id} title={title} completed={completed} />
      ))}
    </List>
  ) : null;
}

export default TasksList;
