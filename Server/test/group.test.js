import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

let userToken;
let anonymousToken;

describe('POST /groups', () => {
  it('should return a status of 201 when user details are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Moses',
        lastName: 'Major',
        email: 'mosesmajor@gmail.com',
        password: 'lottery',
      })
      .end((req, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.property('token');
        anonymousToken = res.body.data[0].token;
        done();
      });
  });

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

  it('should display a status of 400 and an error message', (done) => {
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

describe('PATCH /groups/:groupId/name', () => {
  it('should return a status of 400 when groupId is invalid', (done) => {
    chai.request(app)
      .patch('/api/v1/groups/1f/name')
      .set('Authorization', `Bearer ${userToken}`)
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('groupId is invalid');
        done();
      });
  });

  it('should return a status of 404 when groupId is not found', (done) => {
    chai.request(app)
      .patch('/api/v1/groups/4/name')
      .set('Authorization', `Bearer ${userToken}`)
      .end((req, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('The group with the given ID was not found');
        done();
      });
  });

  it('should return a status of 409 when the user is not the owner of the group', (done) => {
    chai.request(app)
      .patch('/api/v1/groups/1/name')
      .set('Authorization', `Bearer ${anonymousToken}`)
      .end((req, res) => {
        res.should.have.status(409);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('You are not the owner of this group');
        done();
      });
  });

  it('should return a status of 200 when the group name has been modified', (done) => {
    chai.request(app)
      .patch('/api/v1/groups/1/name')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Bootcamper',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        done();
      });
  });
});
