import CREATE_TASK from 'src/graphql/mutations/createTask';
import createdTask from '../data/createdTask';

export const mutationFn = jest.fn();
const createTaskMock = {
  request: {
    query: CREATE_TASK,
    variables: { title: createdTask.title },
  },
  result: () => {
    mutationFn();
    return { data: { insert_tasks_one: createdTask } };
  },
};

export default createTaskMock;
