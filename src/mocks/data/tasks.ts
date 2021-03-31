const tasks = [
  {
    id: 1,
    title: 'First task',
    completed: false,
    parent_id: null,
    __typename: 'tasks',
  },
  {
    id: 2,
    title: 'Second task',
    completed: true,
    parent_id: null,
    __typename: 'tasks',
  },
  {
    id: 3,
    title: 'A subtask',
    completed: false,
    parent_id: 1,
    __typename: 'tasks',
  },
];

export default tasks;
