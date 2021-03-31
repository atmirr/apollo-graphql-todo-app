import TASKS from 'src/graphql/queries/tasks';
import tasks from '../data/tasks';

const tasksMock = {
  request: {
    query: TASKS,
  },
  result: {
    data: { tasks },
  },
};

export default tasksMock;
