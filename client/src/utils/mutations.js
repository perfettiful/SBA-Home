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

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_App = gql`
  mutation addApp($AppText: String!) {
    addApp(AppText: $AppText) {
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

export const ADD_COMMENT = gql`
  mutation addComment($AppId: ID!, $commentText: String!) {
    addComment(AppId: $AppId, commentText: $commentText) {
      _id
      AppText
      AppAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
