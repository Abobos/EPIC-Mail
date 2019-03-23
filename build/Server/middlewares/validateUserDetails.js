"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.signup = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateUserSignUpDetails(userDetails) {
  var schema = {
    firstName: _joi.default.string().regex(/^[a-zA-Z]+$/).error(new Error('firstName is not valid')),
    lastName: _joi.default.string().regex(/^[a-zA-Z]+$/).error(new Error('lastName is not valid')),
    email: _joi.default.string().email().regex(/^[A-Za-z0-9_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/).error(new Error('email is not valid')),
    password: _joi.default.string().trim().min(6).required()
  };
  return _joi.default.validate(userDetails, schema);
}

function validateUserSignInDetails(userDetails) {
  var schema = {
    email: _joi.default.string().email().regex(/^[A-Za-z0-9_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/).error(new Error('email is not valid')),
    password: _joi.default.string().min(6).required()
  };
  return _joi.default.validate(userDetails, schema);
}

var signup = function signup(req, res, done) {
  var _req$body = req.body,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      email = _req$body.email,
      password = _req$body.password;

  if (!firstName) {
    return res.status(400).json({
      status: 400,
      error: 'firstName is required'
    });
  }

  if (!lastName) {
    return res.status(400).json({
      status: 400,
      error: 'lastName is required'
    });
  }

  if (!email) {
    return res.status(400).json({
      status: 400,
      error: 'email is required'
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 400,
      error: 'password is required'
    });
  }

  var _validateUserSignUpDe = validateUserSignUpDetails(req.body),
      error = _validateUserSignUpDe.error;

  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details ? error.details[0].message.replace(/[""]+/g, '') : error.message
    });
  }

  return done();
};

exports.signup = signup;

var login = function login(req, res, done) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  if (!email) {
    return res.status(400).json({
      status: 400,
      error: 'email is required'
    });
  }

  if (!password) {
    return res.status(400).json({
      status: 400,
      error: 'password is required'
    });
  }

  var _validateUserSignInDe = validateUserSignInDetails(req.body),
      error = _validateUserSignInDe.error;

  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details ? error.details[0].message.replace(/[""]+/g, '') : error.message
    });
  }

  return done();
};

exports.login = login;