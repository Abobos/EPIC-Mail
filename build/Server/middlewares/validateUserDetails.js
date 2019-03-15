"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserSignUpDetails = validateUserSignUpDetails;
exports.validateUserSignInDetails = validateUserSignInDetails;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateUserSignUpDetails(userDetails) {
  var schema = {
    firstname: _joi.default.string().trim().required(),
    lastname: _joi.default.string().trim().required(),
    email: _joi.default.string().trim().email().required(),
    password: _joi.default.string().trim().min(6).required()
  };
  return _joi.default.validate(userDetails, schema);
}

function validateUserSignInDetails(userDetails) {
  var schema = {
    email: _joi.default.string().trim().email().required(),
    password: _joi.default.string().min(6).required()
  };
  return _joi.default.validate(userDetails, schema);
}