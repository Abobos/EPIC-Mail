import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();


describe('POST /signup', () => {
  it('should return a status of 400 , when firstName does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        lastName: 'Obiamata',
        email: 'elohorobiamata@gmail.com',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error').eql('firstName is required');
        done();
      });
  });

  it('should return a status of 400 , when email does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elohor',
        lastName: 'Obiamata',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error').eql('email is required');
        done();
      });
  });

  it('should return a status of 400 , when lastName does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elohor',
        email: 'elohorobiamata@gmail.com',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error').eql('lastName is required');
        done();
      });
  });

  it('should return a status of 400 , when password does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elohor',
        lastName: 'Obiamata',
        email: 'elohorobiamata@gmail.com',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error').eql('password is required');
        done();
      });
  });
  it('should return a status of 400 when email is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elohor',
        lastName: 'Obiamata',
        email: 'elohorobiam@gmail',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a status of 400 when password is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elohor',
        lastName: 'Obiamata',
        email: 'elohorobiam@gmail.com',
        password: '324',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a status of 400 when lastName is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elohor',
        lastName: '1234',
        email: 'elohorobiam@gmail.com',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a status of 400 when firstName is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: '1234',
        lastName: 'Obiamata',
        email: 'elohorobiam@gmail.com',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a status of 201 when user details are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elohor',
        lastName: 'Obiamata',
        email: 'elohorobiamata@gmail.com',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.property('token');
        done();
      });
  });
  it('should return a status of 409 when user has already sign up', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Elohor',
        lastName: 'Obiamata',
        email: 'elohorobiamata@gmail.com',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(409);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error');
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
        res.body.should.have.property('status').eql('success');
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
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error').eql('Incorrect password');
        done();
      });
  });

  it('should return a status of 400 when password does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'elohorobiamata@gmail.com',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error').eql('password is required');
        done();
      });
  });

  it('should return a status of 400 when email does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error').eql('email is required');
        done();
      });
  });
  it('should return a status of 400 when user email is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'elohorobiam@gmail',
        password: '321234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a status of 400 when user email is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'elohorobiam@gmail.com',
        password: '3234',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return a status of 404 when user details is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'agbenelson@gmail.com',
        password: '321534',
      })
      .end((req, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('error');
        done();
      });
  });
});
