import MARK_AS_UNCOMPLETED from 'src/graphql/mutations/markAsUncompleted';
import tasks from '../data/tasks';

export const mutationFn = jest.fn();
const markAsUncompletedMock = {
  request: {
    query: MARK_AS_UNCOMPLETED,
    variables: { id: tasks[1].id },
  },
  result: () => {
    mutationFn();
    return { data: { update_tasks_by_pk: { ...tasks[1], completed: false } } };
  },
};

export default markAsUncompletedMock;
