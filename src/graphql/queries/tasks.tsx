import { gql } from '@apollo/client';

const TASKS = gql`
  query {
    tasks {
      completed
      id
      parent_id
      title
    }
  }
`;

export default TASKS;
