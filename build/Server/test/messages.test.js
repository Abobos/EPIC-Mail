"use strict";

var _mocha = require("mocha");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.should(); // Send Messages


(0, _mocha.describe)('POST /messages', function () {
  (0, _mocha.it)('should return a status of 200 when message is sent', function (done) {
    _chai.default.request(_app.default).post('/api/v1/messages').send({
      subject: 'Andela',
      message: 'We provide opportunity',
      user: 'blue'
    }).end(function (req, res) {
      res.should.have.status(200);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data');
      res.body.data.should.have.an('array');
      res.body.data[0].should.have.property('id');
      res.body.data[0].should.have.property('createdOn');
      res.body.data[0].should.have.property('subject');
      res.body.data[0].should.have.property('message');
      res.body.data[0].should.have.property('parentMessageId');
      res.body.data[0].should.have.property('status');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 400 when subject is not found', function (done) {
    _chai.default.request(_app.default).post('/api/v1/messages').send({
      message: 'we provide opportunity',
      user: 'blue'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('subject is required');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 400 when message is not found', function (done) {
    _chai.default.request(_app.default).post('/api/v1/messages').send({
      subject: 'Creative Discourse',
      user: 'blue'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('message is required');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 400 when sender found', function (done) {
    _chai.default.request(_app.default).post('/api/v1/messages').send({
      message: 'Blessing is Creative',
      subject: 'Creative Discourse'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('user is required');
      done();
    });
  });
}); // Received Messages

(0, _mocha.describe)('GET /messages', function () {
  (0, _mocha.it)('should return a status of 200 and show all received messages', function (done) {
    _chai.default.request(_app.default).get('/api/v1/messages').end(function (req, res) {
      res.should.have.status(200);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data');
      res.body.data.should.have.an('array');
      done();
    });
  });
}); // Unread Received Messages

(0, _mocha.describe)('GET /messages/unread', function () {
  (0, _mocha.it)('should return a status of 200 and show all received messages', function (done) {
    _chai.default.request(_app.default).get('/api/v1/messages/unread').end(function (req, res) {
      res.should.have.status(200);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data');
      res.body.data.should.have.an('array');
      done();
    });
  });
}); // Sent Received Messages

(0, _mocha.describe)('GET /messages/sent', function () {
  (0, _mocha.it)('should return a status of 200 and show all sent messages', function (done) {
    _chai.default.request(_app.default).get('/api/v1/messages/sent').end(function (req, res) {
      res.should.have.status(200);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data');
      res.body.data.should.have.an('array');
      done();
    });
  });
}); // Specific Email Record

(0, _mocha.describe)('GET /messages/<message-id>', function () {
  (0, _mocha.it)('should return a status of 200 when message with the given id is found', function (done) {
    _chai.default.request(_app.default).get('/api/v1/messages/1').end(function (req, res) {
      res.should.have.status(200);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data');
      res.body.data.should.have.an('array');
      res.body.data[0].should.have.property('id');
      res.body.data[0].should.have.property('createdOn');
      res.body.data[0].should.have.property('subject');
      res.body.data[0].should.have.property('message');
      res.body.data[0].should.have.property('parentMessageId');
      res.body.data[0].should.have.property('status');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 404 when message with the given Id is not found', function (done) {
    _chai.default.request(_app.default).get('/api/v1/messages/9').end(function (req, res) {
      res.should.have.status(404);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('error').eql('The message with the given id was not found');
      done();
    });
  });
});
(0, _mocha.describe)('DELETE /messages/<message-id>', function () {
  (0, _mocha.it)('should return a status of 200 when message with the given id is found', function (done) {
    _chai.default.request(_app.default).delete('/api/v1/messages/1').end(function (req, res) {
      res.should.have.status(200);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data');
      res.body.data.should.have.an('array');
      res.body.data[0].should.have.property('message');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 404 when message with the given Id is not found', function (done) {
    _chai.default.request(_app.default).delete('/api/v1/messages/9').end(function (req, res) {
      res.should.have.status(404);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('error').eql('The message with the given id was not found');
      done();
    });
  });
});