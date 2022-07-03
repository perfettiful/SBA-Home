import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_APP = gql`
mutation addApp($appTitle: String!, $appDescription: String!) {
  addApp(appTitle: $appTitle, appDescription: $appDescription) {
    _id
    appId
    appKey
    appTitle
    appDescription
    createdAt
  }
}
`;
