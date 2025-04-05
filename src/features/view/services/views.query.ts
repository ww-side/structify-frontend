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

export const GET_VIEW = gql`
  query GetView($id: String!) {
    view(id: $id) {
      name
      icon
      formats
    }
  }
`;
