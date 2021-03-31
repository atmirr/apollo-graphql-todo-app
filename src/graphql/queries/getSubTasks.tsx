import { gql } from '@apollo/client';

const GET_SUB_TASKS = gql`
  query($parent_id: Int!) {
    readSubTasks @client {
      id
      title
      completed
      parent_id
    }
  }
`;

export default GET_SUB_TASKS;
