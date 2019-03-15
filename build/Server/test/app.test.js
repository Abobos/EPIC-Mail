"use strict";

var _mocha = require("mocha");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.should();

(0, _mocha.describe)('GET /', function () {
  (0, _mocha.it)('Should display a welcome to Epic Mail', function (done) {
    _chai.default.request(_app.default).get('/').end(function (req, res) {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('message').eql('Welcome to EPIC Mail');
      done();
    });
  });
});