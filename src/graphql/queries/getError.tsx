import { gql } from '@apollo/client';

const GET_ERROR = gql`
  query {
    error @client
  }
`;

export default GET_ERROR;
