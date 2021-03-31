import GET_MAIN_TASKS from 'src/graphql/queries/getMainTasks';
import tasks from '../data/tasks';

const getMainTasksMock = {
  request: {
    query: GET_MAIN_TASKS,
  },
  result: {
    data: { readMainTasks: [tasks[0], tasks[1]] },
  },
};

export default getMainTasksMock;
