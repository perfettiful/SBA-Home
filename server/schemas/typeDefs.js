const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    apps: [App]!
  }

  type App {
    _id: ID
    appId:String
    appKey: String
    appTitle: String
    appDescription: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    apps(username: String): [App]
    app(AppId: ID!): App
    me: User
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addApp(appTitle: String!, appDescription: String!): App
    removeApp(appId: ID!): App
  }
`;

module.exports = typeDefs;
