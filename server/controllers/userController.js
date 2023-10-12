const { User } = require('../models/userModels');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const userController = {};

// NOTE! We did not get a chance to implement the auth features outlined here. We ran
// out of time, but for the lucky team that gets to work on our project, have at it.
// The two middleware functions below do work though using postman.

// createUser takes the req.body and checks to see if that username exists in the db.
// If it does, it prompts the user to enter a different username. If it doesn't exist,
// then the password gets encrypted and a new user is created in the db.
userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return next({
        log: 'Username already exists.',
        status: 400,
        message: 'Username already exists, select a different username.',
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({ username: username, password: hashedPassword });
      console.log('User created');
      return next();
    }
  } catch (err) {
    return next({
      log: 'Error in userController.createUser middleware.',
      status: 500,
      message: 'Could not create user.',
    });
  }
};
// loginUser takes the req.body and compares the username against what appears in the db.
// If the username exists, it then does a check to see if the password provided checks with
// the bcrypted password stored in the db. If either the username or passwrod don't check out,
// it gives a generic response, but logs whether it was an incorrect username or password in
// the terminal.
userController.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      const result = await bcrypt.compare(password, existingUser.password);
      if (result) {
        res.locals.id = existingUser._id;
        res.locals.existingUser = {
          verified: true,
          username: existingUser.username,
          highScore: existingUser.highScore,
        };

        return next();
      } else {
        return next({
          log: 'Incorrect paswword.',
          status: 401,
          message: 'Incorrect user name or password.',
        });
      }
    } else {
      return next({
        log: 'Incorrect username.',
        status: 401,
        message: 'Incorrect user name or password.',
      });
    }
  } catch (err) {
    return next({
      log: 'Error in userController.loginUser middleware.',
      status: 500,
      message: 'Unable to login at this time.',
    });
  }
};

userController.getLeaderboard = async (req, res, next) => {
  try {
    //get 10 usernames and highscores from db, sorted by descending score
    let users = await User.find({}, 'username highScore', {
      sort: { highScore: -1 },
      limit: 10,
    });
    //save onto res.locals.leaderboard
    res.locals.leaderboard = users;
    return next();
  } catch (err) {
    return next({
      log: 'Error in userController.getLeaderboard middleware.',
      status: 500,
      message: 'Unable to get leaderboard at this time.',
    });
  }
};

userController.getHighScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    //get highscore of user matching username
    let highScore = await User.findOne({ username: id }, 'highScore');
    //save onto res.locals.highScore
    res.locals.highScore = highScore;
    return next();
  } catch (err) {
    return next({
      log: 'Error in userController.getHighScore middleware.',
      status: 500,
      message: "Unable to get user's high score at this time.",
    });
  }
};

userController.updateHighScore = async (req, res, next) => {
  try {
    //POST request wit body {highScore: (number)}
    const { id } = req.params;
    const newScore = req.body.highScore;
    //get highscore of user matching user ID
    let updated = await User.findOneAndUpdate(
      { username: id },
      { highScore: newScore },
      { new: true }
    );
    //save onto res.locals.newHighScore
    res.locals.newHighScore = updated.highScore;
    return next();
  } catch (err) {
    return next({
      log: 'Error in userController.updateHighScore middleware.',
      status: 500,
      message: "Unable to update user's high score at this time.",
    });
  }
};

module.exports = userController;
