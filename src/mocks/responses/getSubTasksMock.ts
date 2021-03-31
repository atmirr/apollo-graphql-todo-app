import GET_SUB_TASKS from 'src/graphql/queries/getSubTasks';
import tasks from '../data/tasks';
import createdTask from '../data/createdTask';

const getSubTasksMock = {
  request: {
    query: GET_SUB_TASKS,
    variables: { parent_id: tasks[0].id },
  },
  result: {
    data: { readSubTasks: { ...createdTask, parent_id: tasks[0].id } },
  },
};

export default getSubTasksMock;
