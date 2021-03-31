import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
} from '@material-ui/core';
import {
  CheckCircleOutline as UndoneIcon,
  CheckCircle as DoneIcon,
} from '@material-ui/icons';
import EditTask from './components/EditTask';
import AddNewSubtask from './components/AddNewSubtask';
import ActionButtons from './components/ActionButtons';
import { TaskType as TaskResponseType } from 'src/types';

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  nested: {},
  root: {
    width: '100%',
    '&$nested': {
      paddingLeft: spacing(6),
    },
  },
  task: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    backgroundColor: palette.grey[50],
    borderRadius: spacing(0.5),
    padding: spacing(1.5, 2),
    margin: spacing(0.5, 0),
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  button: {
    marginLeft: spacing(1),
  },
  completedTask: {},
  listItemText: {
    '&$completedTask': {
      textDecoration: 'line-through',
    },
  },
  primaryText: {
    fontSize: typography.pxToRem(18),
  },
}));

interface TaskType {
  id: number;
  title: string;
  completed: boolean;
  subtasks?: TaskResponseType[];
  handleEdit: (args: { id: number; title: string }) => void;
  handleDelete: (id: number) => void;
  handleToggleDone: (args: { id: number; completed: boolean }) => void;
  handleCreateSubtask: (args: { title: string; parentId: number }) => void;
  isParent?: boolean;
  isLoading?: boolean;
}

function Task({
  id,
  title: passedTitle,
  completed,
  subtasks,
  handleEdit,
  handleDelete,
  handleToggleDone,
  handleCreateSubtask,
  isParent = true,
  isLoading,
}: TaskType) {
  const classes = useStyles();

  const [title, setTitle] = useState(passedTitle);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addSubtaskMode, setAddSubtaskMode] = useState(false);

  const hasSubTasks = subtasks && subtasks.length > 0;

  const toggleEditMode = () => setEdit(!edit);
  const handleChangeTitle = () => {
    handleEdit({ id, title });
    toggleEditMode();
  };
  const handleCancel = () => {
    setTitle(passedTitle);
    toggleEditMode();
  };
  const handleAddSubtaskClick = () => {
    setOpen(true);
    setAddSubtaskMode(true);
  };
  return (
    <div
      data-testid={`task-${id}`}
      className={clsx(classes.root, !isParent && classes.nested)}
    >
      <ListItem button className={classes.task}>
        <div className={classes.wrapper}>
          <IconButton
            disabled={isLoading}
            color="primary"
            onClick={() => handleToggleDone({ id, completed })}
          >
            {completed ? (
              <DoneIcon data-testid={`done-${id}`} aria-label="done" />
            ) : (
              <UndoneIcon data-testid={`undone-${id}`} aria-label="undone" />
            )}
          </IconButton>
          {edit ? (
            <EditTask
              id={id}
              title={title}
              setTitle={setTitle}
              handleChangeTitle={handleChangeTitle}
              handleCancel={handleCancel}
            />
          ) : (
            <ListItemText
              primary={title}
              classes={{
                root: clsx(
                  classes.listItemText,
                  completed && classes.completedTask,
                ),
                primary: classes.primaryText,
              }}
            />
          )}
        </div>
        <ActionButtons
          id={id}
          hasSubTasks={hasSubTasks}
          isLoading={isLoading}
          open={open}
          setOpen={setOpen}
          isParent={isParent}
          toggleEditMode={toggleEditMode}
          handleAddSubtaskClick={handleAddSubtaskClick}
          handleDelete={handleDelete}
        />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {addSubtaskMode && isParent && (
            <AddNewSubtask
              parentId={id}
              handleAddSubtaskMode={setAddSubtaskMode}
              handleCreateSubtask={handleCreateSubtask}
            />
          )}
          {subtasks &&
            subtasks.map(({ id, title, completed }) => (
              <Task
                key={id}
                id={id}
                title={title}
                isParent={false}
                completed={completed}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleToggleDone={handleToggleDone}
                handleCreateSubtask={handleCreateSubtask}
                isLoading={isLoading}
              />
            ))}
        </List>
      </Collapse>
    </div>
  );
}

export default Task;
