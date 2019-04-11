import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

let userToken;

describe('POST /groups', () => {
  it('generate a token', (done) => {
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
        userToken = res.body.data[0].token;
        done();
      });
  });

  it('should display a status of 201 and return the newly created group details', (done) => {
    chai
      .request(app)
      .post('/api/v1/groups')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Bootcamp',
      })
      .end((req, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done();
      });
  });

  it('should display a status of 409 and display an error of group name already exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/groups')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Bootcamp',
      })
      .end((req, res) => {
        res.should.have.status(409);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('group name already exists');
        done();
      });
  });

  it('should display a status of 400 and return the newly created group details', (done) => {
    chai
      .request(app)
      .post('/api/v1/groups')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: '',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('group name is required');
        done();
      });
  });

  it('should display a status of 400 and return the newly created group details', (done) => {
    chai
      .request(app)
      .post('/api/v1/groups')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'gheg66',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('group name is not valid');
        done();
      });
  });
});

describe('GET /groups', () => {
  it('should retun a status code of 200 and display all group records', (done) => {
    chai
      .request(app)
      .get('/api/v1/groups')
      .set('Authorization', `Bearer ${userToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done();
      });
  });
});