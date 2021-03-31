import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import CREATE_TASK, { updateCache } from 'src/graphql/mutations/createTask';

const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
    cursor: 'text',
    '& input': {
      height: 25,
    },
  },
}));

function AddNewTask() {
  const classes = useStyles();
  const [createTask] = useMutation(CREATE_TASK, {
    update(cache, { data: { insert_tasks_one: createdTask } }) {
      updateCache(cache, createdTask);
    },
  });
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const element = e.target as HTMLInputElement;
    const title = element.value;
    if (e.keyCode == 13 && title !== '') {
      createTask({ variables: { title } });
      element.value = '';
    }
  };
  return (
    <TextField
      placeholder="Enter a task and press Return ⏎"
      variant="outlined"
      onKeyDown={handleKeyDown}
      className={classes.input}
      autoFocus
    />
  );
}

export default AddNewTask;
