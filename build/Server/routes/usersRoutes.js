"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersControllers = _interopRequireDefault(require("../controllers/usersControllers"));

var _validateUserDetails = require("../middlewares/validateUserDetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/signup', _validateUserDetails.signup, _usersControllers.default.userSignUp);
router.post('/login', _validateUserDetails.login, _usersControllers.default.userSignIn);
var _default = router;
exports.default = _default;