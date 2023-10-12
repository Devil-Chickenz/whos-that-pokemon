const { User } = require('../models/userModels');
const { Session } = require('../models/sessionModel');
const { v4: uuidv4 } = require('uuid');

const cookieController = {};

const sessions = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  const { username, password } = req.body;
  res.cookie('SSID', res.locals.id, { httpOnly: true });
  return next();
};

cookieController.startSession = async (req, res, next) => {
  const newSession = await Session.create({ cookieId: res.locals.id });
  return next();
};

cookieController.checkSession = async (req, res, next) => {
  console.log('Hello');
};

module.exports = cookieController;
