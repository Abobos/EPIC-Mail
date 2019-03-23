"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersV = _interopRequireDefault(require("../controllers/users.v1.Controllers"));

var _validateUserDetails = require("../middlewares/validateUserDetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/signup', _validateUserDetails.signup, _usersV.default.userSignUp);
router.post('/login', _validateUserDetails.login, _usersV.default.userSignIn);
var _default = router;
exports.default = _default;