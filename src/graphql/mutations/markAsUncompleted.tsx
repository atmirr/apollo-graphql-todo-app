import { gql } from '@apollo/client';

const MARK_AS_UNCOMPLETED = gql`
  mutation($id: Int!) {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { completed: false }) {
      id
      parent_id
      title
      completed
    }
  }
`;

export default MARK_AS_UNCOMPLETED;
