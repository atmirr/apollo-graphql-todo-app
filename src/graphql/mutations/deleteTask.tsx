import {
  gql,
  ApolloCache,
  NormalizedCacheObject,
  Reference,
} from '@apollo/client';

const DELETE_TASK = gql`
  mutation($id: Int!) {
    delete_tasks_by_pk(id: $id) {
      id
      parent_id
      title
      completed
    }
  }
`;

export const updateCache = (
  cache: ApolloCache<NormalizedCacheObject>,
  { id }: { id: number },
) => {
  cache.modify({
    fields: {
      tasks(existingTaskRefs, { readField }) {
        return existingTaskRefs.filter(
          (taskRef: Reference) => id !== readField('id', taskRef),
        );
      },
    },
  });
};

export default DELETE_TASK;
