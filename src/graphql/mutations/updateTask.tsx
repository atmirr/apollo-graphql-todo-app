import { gql } from '@apollo/client';

const UPDATE_TASK = gql`
  mutation($id: Int!, $title: String!) {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
      id
      parent_id
      title
      completed
    }
  }
`;

export default UPDATE_TASK;
