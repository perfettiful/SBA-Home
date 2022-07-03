const { AuthenticationError } = require('apollo-server-express');
const { User, App } = require('../models');
const { signToken } = require('../utils/auth');

const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('Apps');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('Apps');
    },
    apps: async (parent, { username }) => {
      const params = username ? { username } : {};
      return App.find(params).sort({ createdAt: -1 });
    },
    app: async (parent, { AppId }) => {
      return App.findOne({ _id: AppId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('apps');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    register: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addApp: async (parent, { appTitle, appDescription }, context) => {

      if (appTitle && appDescription) {
        const newApp = await App.create({ appTitle, appDescription });

        const hashedApiKey = await App.findByIdAndUpdate(
          { _id: newApp._id },
          { appKey: await bcrypt.hash(newApp.appKey, 10) }
        )

        return newApp;
      }

      throw new AuthenticationError('You need all required fields');
    },

    removeApp: async (parent, { AppId }, context) => {
      if (context.user) {
        const App = await App.findOneAndDelete({
          _id: AppId,
          AppAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { Apps: App._id } }
        );

        return App;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
