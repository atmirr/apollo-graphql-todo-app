import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  editInput: {
    flexGrow: 1,
  },
  button: {
    marginLeft: spacing(1),
  },
}));

interface EditTaskType {
  id: number;
  title: string;
  setTitle: (title: string) => void;
  handleChangeTitle: () => void;
  handleCancel: () => void;
}

function EditTask({
  id,
  title,
  setTitle,
  handleChangeTitle,
  handleCancel,
}: EditTaskType) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={classes.editInput}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        aria-label="save"
        data-testid={`save-${id}`}
        onClick={handleChangeTitle}
        className={classes.button}
      >
        Save
      </Button>
      <Button
        variant="contained"
        size="small"
        aria-label="cancel"
        data-testid={`cancel-${id}`}
        onClick={handleCancel}
        className={classes.button}
      >
        Cancel
      </Button>
    </div>
  );
}

export default EditTask;
