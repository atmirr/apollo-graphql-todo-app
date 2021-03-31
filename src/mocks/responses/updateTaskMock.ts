import UPDATE_TASK from 'src/graphql/mutations/updateTask';
import tasks from '../data/tasks';
import updatedTask from '../data/createdTask';

export const mutationFn = jest.fn();
const createTaskMock = {
  request: {
    query: UPDATE_TASK,
    variables: { id: tasks[0].id, title: updatedTask.title },
  },
  result: () => {
    mutationFn();
    return {
      data: { update_tasks_by_pk: { ...tasks[0], title: updatedTask.title } },
    };
  },
};

export default createTaskMock;
