import CREATE_TASK from 'src/graphql/mutations/createTask';
import tasks from '../data/tasks';
import createdTask from '../data/createdTask';

export const mutationFn = jest.fn();
const createSubtaskMock = {
  request: {
    query: CREATE_TASK,
    variables: { title: createdTask.title, parent_id: tasks[0].id },
  },
  result: () => {
    mutationFn();
    return {
      data: { insert_tasks_one: { ...createdTask, parent_id: tasks[0].id } },
    };
  },
};

export default createSubtaskMock;
