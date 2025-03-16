import { gql } from '@apollo/client';

export const CREATE_VIEW_MUTATION = gql`
  mutation CreateView($createViewInput: CreateViewInput!) {
    createView(createViewInput: $createViewInput) {
      id
      name
      formats
      icon
      createdAt
      updatedAt
    }
  }
`;
