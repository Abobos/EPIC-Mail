"use strict";

var _mocha = require("mocha");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.should();

(0, _mocha.describe)('POST /signup', function () {
  (0, _mocha.it)('should return a status of 400 , when firstName does not exist', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signup').send({
      lastName: 'Obiamata',
      email: 'elohorobiamata@gmail.com',
      password: '321234'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('firstName is required');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 400 , when email does not exist', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signup').send({
      firstName: 'Elohor',
      lastName: 'Obiamata',
      password: '321234'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('email is required');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 400 , when lastName is does not exist', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signup').send({
      firstName: 'Elohor',
      email: 'elohorobiamata@gmail.com',
      password: '321234'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('lastName is required');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 400 , when password does not exist', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signup').send({
      firstName: 'Elohor',
      lastName: 'Obiamata',
      email: 'elohorobiamata@gmail.com'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('password is required');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 201 when email is not valid', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signup').send({
      firstName: 'Elohor',
      lastName: 'Obiamata',
      email: 'elohorobiam@gmail',
      password: '321234'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('email is not valid');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 201 when user details are valid', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signup').send({
      firstName: 'Elohor',
      lastName: 'Obiamata',
      email: 'elohorobiamata@gmail.com',
      password: '321234'
    }).end(function (req, res) {
      res.should.have.status(201);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(201);
      res.body.should.have.property('data');
      res.body.data.should.have.an('array');
      res.body.data[0].should.have.property('token');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 409 when user has already sign up', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/signup').send({
      firstName: 'Elohor',
      lastName: 'Obiamata',
      email: 'elohorobiamata@gmail.com',
      password: '321234'
    }).end(function (req, res) {
      res.should.have.status(409);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(409);
      res.body.should.have.property('error').eql('User already exists, Sign In!');
      done();
    });
  });
});
(0, _mocha.describe)('POST /login', function () {
  (0, _mocha.it)('should return a status of 200 when user details are valid', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send({
      email: 'elohorobiamata@gmail.com',
      password: '321234'
    }).end(function (req, res) {
      res.should.have.status(200);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(200);
      res.body.should.have.property('data');
      res.body.data.should.have.an('array');
      res.body.data[0].should.have.property('token');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 401 when user password is incorrect', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send({
      email: 'elohorobiamata@gmail.com',
      password: '321239'
    }).end(function (req, res) {
      res.should.have.status(401);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(401);
      res.body.should.have.property('error').eql('Incorrect password!');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 400 when password does not exist', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send({
      email: 'elohorobiamata@gmail.com'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('password is required');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 400 when email does not exist', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send({
      password: '321234'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('email is required');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 400 when user email is not valid', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send({
      email: 'elohorobiam@gmail',
      password: '321234'
    }).end(function (req, res) {
      res.should.have.status(400);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('error').eql('email is not valid');
      done();
    });
  });
  (0, _mocha.it)('should return a status of 404 when user details is not found', function (done) {
    _chai.default.request(_app.default).post('/api/v1/auth/login').send({
      email: 'agbenelson@gmail.com',
      password: '321534'
    }).end(function (req, res) {
      res.should.have.status(404);
      res.should.be.an('object');
      res.body.should.have.property('status').eql(404);
      res.body.should.have.property('error').eql('Details not found, Sign Up!');
      done();
    });
  });
});