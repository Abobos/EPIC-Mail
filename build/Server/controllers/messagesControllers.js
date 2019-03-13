"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messages = _interopRequireDefault(require("../database/messages"));

var _validateMessageDetails = _interopRequireDefault(require("../middlewares/validateMessageDetails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var messagesControllers =
/*#__PURE__*/
function () {
  function messagesControllers() {
    _classCallCheck(this, messagesControllers);
  }

  _createClass(messagesControllers, null, [{
    key: "sendMessage",
    value: function sendMessage(req, res) {
      var _validateMessageDetai = (0, _validateMessageDetails.default)(req.body),
          error = _validateMessageDetai.error;

      if (error) {
        return res.status(400).json({
          status: 400,
          error: error.details[0].message.replace(/[""]+/g, '')
        });
      }

      return res.status(200).json({
        status: 200,
        data: [{
          id: _messages.default.length + 1,
          createdOn: new Date().toLocaleString(),
          subject: req.body.subject,
          message: req.body.message,
          parentMessageId: _messages.default.length + 1,
          status: 'sent'
        }]
      });
    }
  }, {
    key: "receivedMessage",
    value: function receivedMessage(req, res) {
      var receivedMessage = _messages.default.filter(function (message) {
        return message.status === 'read';
      });

      return res.status(200).json({
        status: 200,
        data: [receivedMessage]
      });
    }
  }, {
    key: "receivedUnreadMessage",
    value: function receivedUnreadMessage(req, res) {
      var receivedUnreadMessage = _messages.default.filter(function (message) {
        return message.status === 'unread';
      });

      return res.status(200).json({
        status: 200,
        data: [receivedUnreadMessage]
      });
    }
  }, {
    key: "receivedSentMessage",
    value: function receivedSentMessage(req, res) {
      var receivedSentMessage = _messages.default.filter(function (message) {
        return message.status === 'sent';
      });

      return res.status(200).json({
        status: 200,
        data: [receivedSentMessage]
      });
    }
  }, {
    key: "getUserMessage",
    value: function getUserMessage(req, res) {
      var messageId = Number(req.params.Id);

      var getMessage = _messages.default.find(function (m) {
        return m.id === messageId;
      });

      if (!getMessage) {
        return res.status(404).json({
          status: 404,
          error: 'The message with the given id was not found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: [getMessage]
      });
    }
  }, {
    key: "DeleteMessage",
    value: function DeleteMessage(req, res) {
      var messageId = Number(req.params.Id);

      var getMessage = _messages.default.find(function (m) {
        return m.id === messageId;
      });

      if (!getMessage) {
        return res.status(404).json({
          status: 404,
          error: 'The message with the given id was not found'
        });
      }

      var messageIndex = _messages.default.indexOf(getMessage);

      _messages.default.splice(messageIndex, 1);

      return res.status(200).json({
        status: 200,
        data: [{
          message: getMessage.message
        }]
      });
    }
  }]);

  return messagesControllers;
}();

var _default = messagesControllers;
exports.default = _default;
//# sourceMappingURL=messagesControllers.js.map