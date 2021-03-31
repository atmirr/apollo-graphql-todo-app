import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, ListItem } from '@material-ui/core';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    width: '100%',
    paddingLeft: spacing(6),
  },
  addNewSubtask: {
    backgroundColor: palette.grey[50],
    borderRadius: spacing(0.5),
    padding: spacing(2.5, 2),
    margin: spacing(0.5, 0),
  },
  input: {
    width: '100%',
  },
}));

interface AddNewSubTaskTypes {
  parentId: number;
  handleAddSubtaskMode: (addSubtaskMode: boolean) => void;
  handleCreateSubtask: (args: { title: string; parentId: number }) => void;
}

function AddNewSubTask({
  parentId,
  handleAddSubtaskMode,
  handleCreateSubtask,
}: AddNewSubTaskTypes) {
  const classes = useStyles();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const element = e.target as HTMLInputElement;
    const title = element.value;
    if (e.keyCode == 13 && title !== '') {
      handleCreateSubtask({ parentId, title });
      element.value = '';
      handleAddSubtaskMode(false);
    }
  };
  return (
    <div className={classes.root}>
      <ListItem button className={classes.addNewSubtask}>
        <TextField
          placeholder="Enter a subtask and press Return ⏎ to save"
          onKeyDown={handleKeyDown}
          className={classes.input}
          autoFocus
        />
      </ListItem>
    </div>
  );
}

export default AddNewSubTask;
