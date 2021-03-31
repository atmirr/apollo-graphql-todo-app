import { gql } from '@apollo/client';

const GET_MAIN_TASKS = gql`
  query {
    readMainTasks @client {
      id
      title
      completed
      parent_id
    }
  }
`;

export default GET_MAIN_TASKS;
