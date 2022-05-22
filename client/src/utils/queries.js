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

export const QUERY_AppS = gql`
  query getApps {
    Apps {
      _id
      AppText
      AppAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_App = gql`
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
  query me {
    me {
      _id
      username
      email
      Apps {
        _id
        AppText
        AppAuthor
        createdAt
      }
    }
  }
`;
