
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('POST /signup', () => {
  it('should return a status of 201 when user details are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Elohor',
        lastname: 'Obiamata',
        email: 'elohorobiamata@gmail.com',
        password: '321234',
        confirm_password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.property('token');
        done();
      });
  });

  it('should return a status of 400 , when firstname is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        lastname: 'Obiamata',
        email: 'elohorobiamata@gmail.com',
        password: '321234',
        confirm_password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('firstname is required');
        done();
      });
  });

  it('should return a status of 400 , when lastname is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Elohor',
        email: 'elohorobiamata@gmail.com',
        password: '321234',
        confirm_password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastname is required');
        done();
      });
  });

  it('should return a status of 400 , when email is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Elohor',
        lastname: 'Obiamata',
        password: '321234',
        confirm_password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('email is required');
        done();
      });
  });

  it('should return a status of 400 , when lastname is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Elohor',
        email: 'elohorobiamata@gmail.com',
        password: '321234',
        confirm_password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('lastname is required');
        done();
      });
  });

  it('should return a status of 400 , when password is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Elohor',
        lastname: 'Obiamata',
        email: 'elohorobiamata@gmail.com',
        confirm_password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('password is required');
        done();
      });
  });
  it('should return a status of 409 when user has already sign up', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Elohor',
        lastname: 'Obiamata',
        email: 'elohorobiamata@gmail.com',
        password: '321234',
        confirm_password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(409);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error').eql('User already exists, Sign In!');
        done();
      });
  });
});

describe('POST /login', () => {
  it('should return a status of 200 when user details are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'elohorobiamata@gmail.com',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.property('token');
        done();
      });
  });

  it('should return a status of 401 when user password is incorrect', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'elohorobiamata@gmail.com',
        password: '321239',
      })
      .end((req, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error').eql('Incorrect password!');
        done();
      });
  });

  it('should return a status of 400 when password is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'elohorobiamata@gmail.com',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('password is required');
        done();
      });
  });
  it('should return a status of 400 when user email is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('email is required');
        done();
      });
  });
});
