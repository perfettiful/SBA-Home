import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      Apps {
        _id
        AppText
        createdAt
      }
    }
  }
`;

export const QUERY_APPS = gql`
  query apps {
    apps {
      _id
      appTitle
      appDescription
      createdAt
    }
  }
`;

export const QUERY_SINGLE_APP = gql`
  query getSingleApp($AppId: ID!) {
    App(AppId: $AppId) {
      _id
      AppText
      AppAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
query Query {
  me {
    _id
    username
    email
    password
  }
}
`;
