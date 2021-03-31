import { gql, ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { TaskFieldType } from 'src/types';

const CREATE_TASK = gql`
  mutation($title: String!, $parent_id: Int) {
    insert_tasks_one(object: { title: $title, parent_id: $parent_id }) {
      id
      parent_id
      title
      completed
    }
  }
`;

export const updateCache = (
  cache: ApolloCache<NormalizedCacheObject>,
  createdTask: TaskFieldType,
) => {
  cache.modify({
    fields: {
      tasks(existingTasks = []) {
        const newTaskRef = cache.writeFragment({
          data: createdTask,
          fragment: gql`
            fragment NewTask on Task {
              id
              title
              completed
              parent_id
            }
          `,
        });
        return [...existingTasks, newTaskRef];
      },
    },
  });
};

export default CREATE_TASK;
