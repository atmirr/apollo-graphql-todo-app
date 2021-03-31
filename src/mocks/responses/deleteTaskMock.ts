import DELETE_TASK from 'src/graphql/mutations/deleteTask';
import tasks from '../data/tasks';

export const mutationFn = jest.fn();
const deleteTask = {
  request: {
    query: DELETE_TASK,
    variables: { id: tasks[0].id },
  },
  result: () => {
    mutationFn();
    return { data: { delete_tasks_by_pk: tasks[0] } };
  },
};

export default deleteTask;
