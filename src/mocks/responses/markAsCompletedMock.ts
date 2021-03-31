import MARK_AS_COMPLETED from 'src/graphql/mutations/markAsCompleted';
import tasks from '../data/tasks';

export const mutationFn = jest.fn();
const markAsCompletedMock = {
  request: {
    query: MARK_AS_COMPLETED,
    variables: { id: tasks[0].id },
  },
  result: () => {
    mutationFn();
    return { data: { MarkAsComplete: { ...tasks[0], completed: true } } };
  },
};

export default markAsCompletedMock;
