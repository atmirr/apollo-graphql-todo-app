import { gql, ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { TaskFieldType } from 'src/types';

const MARK_AS_COMPLETED = gql`
  mutation($id: Int!) {
    MarkAsComplete(id: $id) {
      id
      title
      completed
      parent_id
    }
  }
`;

export const updateCache = (
  cache: ApolloCache<NormalizedCacheObject>,
  completedTask: TaskFieldType,
) => {
  cache.modify({
    fields: {
      tasks(existingTasks = []) {
        const newTaskRef = cache.writeFragment({
          data: { ...completedTask, __typename: `tasks:${completedTask.id}` },
          fragment: gql`
            fragment MyTask on Task {
              completed
            }
          `,
        });
        return [...existingTasks, newTaskRef];
      },
    },
  });
};

export default MARK_AS_COMPLETED;
