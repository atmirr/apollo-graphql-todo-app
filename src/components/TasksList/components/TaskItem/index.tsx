import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import GET_SUB_TASKS from 'src/graphql/queries/getSubTasks';
import UPDATE_TASK from 'src/graphql/mutations/updateTask';
import DELETE_TASK, {
  updateCache as updateCacheAfterDelete,
} from 'src/graphql/mutations/deleteTask';
import MARK_AS_COMPLETED, {
  updateCache as updateCacheAfterCompleted,
} from 'src/graphql/mutations/markAsCompleted';
import MARK_AS_UNCOMPLETED from 'src/graphql/mutations/markAsUncompleted';
import CREATE_TASK, { updateCache } from 'src/graphql/mutations/createTask';
import Task from './components/Task';
import { TaskType } from 'src/types';

function TaskItem({ id, title, completed }: TaskType) {
  const { data: subtasks } = useQuery(GET_SUB_TASKS, {
    variables: { parent_id: id },
  });

  const [editTask, { loading: updateLoading }] = useMutation(UPDATE_TASK);
  const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK, {
    update(cache, { data: { delete_tasks_by_pk: deletedTask } }) {
      updateCacheAfterDelete(cache, deletedTask);
    },
  });
  const [markAsCompletedTask, { loading: completedLoading }] = useMutation(
    MARK_AS_COMPLETED,
    {
      update(cache, { data: { MarkAsComplete: completedTask } }) {
        updateCacheAfterCompleted(cache, completedTask);
      },
    },
  );
  const [markAsUncompletedTask, { loading: uncompletedLoading }] = useMutation(
    MARK_AS_UNCOMPLETED,
  );
  const [createTask] = useMutation(CREATE_TASK, {
    update(cache, { data: { insert_tasks_one: createdTask } }) {
      updateCache(cache, createdTask);
    },
  });

  const taskIsLoading =
    updateLoading || deleteLoading || completedLoading || uncompletedLoading;

  const handleEdit = ({ id, title }: { id: number; title: string }) =>
    editTask({ variables: { id, title } });
  const handleDelete = (id: number) => deleteTask({ variables: { id } });
  const handleToggleDone = ({
    id,
    completed,
  }: {
    id: number;
    completed: boolean;
  }) =>
    completed
      ? markAsUncompletedTask({ variables: { id } })
      : markAsCompletedTask({ variables: { id } });
  const handleCreateSubtask = ({
    title,
    parentId,
  }: {
    parentId: number;
    title: string;
  }) => createTask({ variables: { title, parent_id: parentId } });
  return (
    <Task
      id={id}
      title={title}
      completed={completed}
      subtasks={subtasks?.readSubTasks}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleToggleDone={handleToggleDone}
      handleCreateSubtask={handleCreateSubtask}
      isLoading={taskIsLoading}
    />
  );
}

export default TaskItem;
