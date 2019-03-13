"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _usersRoutes = _interopRequireDefault(require("./Server/routes/usersRoutes"));

var _messagesRoutes = _interopRequireDefault(require("./Server/routes/messagesRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var PORT = process.env.port || 8080;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use('/api/v1/auth', _usersRoutes.default);
app.use('/api/v1', _messagesRoutes.default);
app.listen(PORT, function () {
  // eslint-disable-next-line no-console
  console.log("Listening to the port ".concat(PORT));
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map