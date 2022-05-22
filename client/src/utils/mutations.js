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
  mutation addApp($AppText: String!) {
    addApp(appText: $appText) {
      _id
      AppText
      AppAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;
