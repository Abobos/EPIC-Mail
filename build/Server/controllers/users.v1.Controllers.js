"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pool = _interopRequireDefault(require("../database/config/pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var UsersControllers =
/*#__PURE__*/
function () {
  function UsersControllers() {
    _classCallCheck(this, UsersControllers);
  }

  _createClass(UsersControllers, null, [{
    key: "userSignUp",
    value: function userSignUp(req, res) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          password = _req$body.password;

      _pool.default.query('SELECT * FROM users WHERE email = $1', [email], function (err, result, next) {
        if (err) throw err;

        if (result.rows.length > 0) {
          return res.status(409).json({
            status: 409,
            error: 'User already exists, Sign In!'
          });
        }

        var hashPassword = _bcrypt.default.hashSync(password, 10);

        var payload = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        };

        var userToken = _jsonwebtoken.default.sign(payload, process.env.SECRET_KEY, {
          expiresIn: '1h'
        });

        _pool.default.query('INSERT INTO users (firstname, lastname, email , password) VALUES ($1, $2, $3, $4)', [firstName, lastName, email, hashPassword], function (error, user, done) {
          if (error) throw error;

          if (user.rows) {
            return res.status(201).json({
              status: 201,
              data: [{
                token: userToken
              }]
            });
          }
        });
      });
    }
  }, {
    key: "userSignIn",
    value: function userSignIn(req, res) {
      var email = req.body.email;

      _pool.default.query('SELECT * FROM users WHERE email = $1', [email], function (err, result) {
        if (err) throw err;

        if (result.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'Details not found, Sign Up!'
          });
        }

        var hashpassword = result.rows[0].password;

        var hashValue = _bcrypt.default.compareSync(req.body.password, hashpassword);

        if (!hashValue) {
          return res.status(401).json({
            status: 401,
            error: 'Incorrect password!'
          });
        }

        var payload = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        };

        var userToken = _jsonwebtoken.default.sign(payload, process.env.SECRET_KEY, {
          expiresIn: '1h'
        });

        return res.status(200).json({
          status: 200,
          data: [{
            token: userToken
          }]
        });
      });
    }
  }]);

  return UsersControllers;
}();

var _default = UsersControllers;
exports.default = _default;