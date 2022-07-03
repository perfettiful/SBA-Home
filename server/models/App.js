const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcryptjs');

const MUUID = require('uuid-mongodb');
const generateApiKey = require('generate-api-key');

const appSchema = new Schema({
  appId: {
    type: String,
    default: MUUID.v4().toString()
  },

  appKey: {
    type: String,
    default: generateApiKey({
      method: 'string',
      min: 25,
      prefix: 'sba_api'
    })
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

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

appSchema.post('save', async function (document, next) {

  if (this.isNew || this.isModified('appKey')) {
    const saltRounds = 10;
    this.appKey = await bcrypt.hash(this.appKey, saltRounds);
  }

  next();
});



appSchema.methods.isValidKey = async function (appKey) {
  return bcrypt.compare(appKey, this.appKey);
};

const App = model('App', appSchema);

module.exports = App;
