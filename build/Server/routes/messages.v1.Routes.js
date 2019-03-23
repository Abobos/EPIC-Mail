"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _messagesV = _interopRequireDefault(require("../controllers/messages.v1.Controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/messages', _messagesV.default.sendMessage);
router.get('/messages', _messagesV.default.receivedMessage);
router.get('/messages/unread', _messagesV.default.receivedUnreadMessage);
router.get('/messages/sent', _messagesV.default.receivedSentMessage);
router.get('/messages/:Id', _messagesV.default.getUserMessage);
router.delete('/messages/:Id', _messagesV.default.DeleteMessage);
var _default = router;
exports.default = _default;