"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _users = _interopRequireDefault(require("../database/users"));

var _validateUserDetails = require("../middlewares/validateUserDetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersControllers =
/*#__PURE__*/
function () {
  function UsersControllers() {
    _classCallCheck(this, UsersControllers);
  }

  _createClass(UsersControllers, null, [{
    key: "userSignUp",
    // eslint-disable-next-line class-methods-use-this
    value: function userSignUp(req, res) {
      var _validateUserSignUpDe = (0, _validateUserDetails.validateUserSignUpDetails)(req.body),
          error = _validateUserSignUpDe.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.details[0].message.replace(/[""]+/g, '')
        });
      }

      var getuser = _users.default.find(function (k) {
        return k.email === req.body.email;
      });

      if (getuser) {
        return res.status(409).json({
          status: 409,
          error: 'User already exists, Sign In!'
        });
      }

      var hashPassword = _bcrypt.default.hashSync(req.body.password, 10);

      var payload = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword
      };

      var userToken = _jsonwebtoken.default.sign(payload, 'secret', {
        expiresIn: 1440
      });

      var user = {
        id: _users.default.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPassword,
        authData: userToken
      };

      _users.default.push(user);

      return res.status(201).json({
        status: 201,
        data: [{
          token: userToken
        }]
      });
    }
  }, {
    key: "userSignIn",
    value: function userSignIn(req, res) {
      var _validateUserSignInDe = (0, _validateUserDetails.validateUserSignInDetails)(req.body),
          error = _validateUserSignInDe.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.details[0].message.replace(/[""]+/g, '')
        });
      }

      var user = _users.default.find(function (k) {
        return k.email === req.body.email;
      });

      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'Details not found, Sign Up!'
        });
      }

      var authData = user.authData,
          password = user.password;

      var hashValue = _bcrypt.default.compareSync(req.body.password, password);

      if (!hashValue) {
        return res.status(401).json({
          status: 401,
          error: 'Incorrect password!'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [{
          token: authData
        }]
      });
    }
  }]);

  return UsersControllers;
}();

var _default = UsersControllers;
exports.default = _default;