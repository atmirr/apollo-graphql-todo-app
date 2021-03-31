import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCircleOutline as AddIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  nested: {},
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

interface ActionButtonsTypes {
  id: number;
  hasSubTasks?: boolean;
  isLoading?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  isParent: boolean;
  toggleEditMode: () => void;
  handleAddSubtaskClick: () => void;
  handleDelete: (id: number) => void;
}

function ActionButtons({
  id,
  hasSubTasks,
  isLoading,
  open,
  setOpen,
  isParent,
  toggleEditMode,
  handleAddSubtaskClick,
  handleDelete,
}: ActionButtonsTypes) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {hasSubTasks && (
        <IconButton
          disabled={isLoading}
          color="primary"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ExpandLessIcon aria-label="expand-more" />
          ) : (
            <ExpandMoreIcon aria-label="expand-less" />
          )}
        </IconButton>
      )}
      {isParent && (
        <IconButton
          disabled={isLoading}
          color="primary"
          aria-label="add"
          data-testid={`add-${id}`}
          onClick={handleAddSubtaskClick}
        >
          <AddIcon />
        </IconButton>
      )}
      <IconButton
        disabled={isLoading}
        color="primary"
        aria-label="edit"
        data-testid={`edit-${id}`}
        onClick={toggleEditMode}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        disabled={isLoading}
        color="primary"
        edge="end"
        aria-label="delete"
        data-testid={`delete-${id}`}
        onClick={() => handleDelete(id)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default ActionButtons;
