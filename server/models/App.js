const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');

const MUUID = require('uuid-mongodb');

const appSchema = new Schema({
  appKey: {
    type: String,
    default: MUUID.v4().toString()
  },

  appTitle: {
    type: String,
    // required: 'Please title your app!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  appDescription: {
    type: String,
    // required: 'Please describe your app!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  appOwner: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

appSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('appKey')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.appKey, saltRounds);
  }

  next();
});

appSchema.methods.isValidKey = async function (appKey) {
  return bcrypt.compare(appKey, this.appKey);
};

const App = model('App', appSchema);

module.exports = App;
