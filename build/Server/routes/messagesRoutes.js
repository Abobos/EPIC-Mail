"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _messagesControllers = _interopRequireDefault(require("../controllers/messagesControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/messages', _messagesControllers.default.sendMessage);
router.get('/messages', _messagesControllers.default.receivedMessage);
router.get('/messages/unread', _messagesControllers.default.receivedUnreadMessage);
router.get('/messages/sent', _messagesControllers.default.receivedSentMessage);
router.get('/messages/:Id', _messagesControllers.default.getUserMessage);
router.delete('/messages/:Id', _messagesControllers.default.DeleteMessage);
var _default = router;
exports.default = _default;
//# sourceMappingURL=messagesRoutes.js.map