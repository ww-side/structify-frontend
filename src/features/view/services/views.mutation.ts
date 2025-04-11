import { gql } from '@apollo/client';

export const DELETE_VIEW = gql`
  mutation DeleteView($id: String!) {
    deleteView(id: $id) {
      name
    }
  }
`;

export const EDIT_VIEW_MUTATION = gql`
  mutation EditView($updateViewInput: UpdateViewInput!) {
    updateView(updateViewInput: $updateViewInput) {
      id
      name
      icon
      formats
    }
  }
`;
