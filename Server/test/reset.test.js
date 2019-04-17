import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();


let userToken;
describe('Send Password Link', () => {
  it('should return a status of 201 when user has registered', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Blessing',
        lastName: 'Abobo',
        email: 'suspieabobo@yahoo.com',
        password: '321534',
      })
      .end((req, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.property('token');
        userToken = res.body.data[0].token;
        done();
      });
  });

  it('should return a status of 404 when user details is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'suspieaboo@yahoo.com',
      })
      .end((req, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('Invalid credentials');
        done();
      });
  });

  it('should return a status of 500 when network fails', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/reset')
      .send({
        email: 'suspieabobo@yahoo.com',
      })
      .end((req, res) => {
        res.should.have.status(500);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('Network Issue: something went wrong');
        done();
      });
  });
  // it('should return a status of 200 when message is sent', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/reset')
  //     .send({
  //       email: 'suspieabobo@yahoo.com',
  //     })
  //     .end((req, res) => {
  //       res.should.have.status(200);
  //       res.should.be.an('object');
  //       res.body.should.have.property('status').eql('success');
  //       res.body.should.have.property('data');
  //       res.body.data.should.have.an('array');
  //       res.body.data[0].should.have.property('message');
  //       res.body.data[0].should.have.property('email');
  //       done();
  //     });
  // });
});

describe('Change Password', () => {
  it('should return a status of 400 when password is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/change_password')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        password: '',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a status of 200 when password reset is successful', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/change_password')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        password: 'bluewaters3',
      })
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.property('message').eql('Your password reset was successful');
        done();
      });
  });
});
