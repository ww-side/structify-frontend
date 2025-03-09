import { gql } from '@apollo/client';

export const GET_VIEWS = gql`
  query {
    views {
      id
      name
      icon
    }
  }
`;
