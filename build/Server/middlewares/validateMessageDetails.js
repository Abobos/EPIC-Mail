"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateMessageDetails(MessageDetails) {
  var schema = {
    subject: _joi.default.string().required(),
    message: _joi.default.string().required(),
    user: _joi.default.string().required()
  };
  return _joi.default.validate(MessageDetails, schema);
}

var _default = validateMessageDetails;
exports.default = _default;
//# sourceMappingURL=validateMessageDetails.js.map