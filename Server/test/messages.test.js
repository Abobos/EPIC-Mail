
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

// Send Messages
describe('POST /messages', () => {
  it('should return a status of 200 when message is sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .send({
        subject: 'Andela',
        message: 'We provide opportunity',
        user: 'blue',
      })
      .end((req, res) => {
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

  it('should return a status of 400 when subject is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .send({
        message: 'we provide opportunity',
        user: 'blue',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('subject is required');
        done();
      });
  });

  it('should return a status of 400 when message is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .send({
        subject: 'Creative Discourse',
        user: 'blue',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('message is required');
        done();
      });
  });

  it('should return a status of 400 when sender found', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .send({
        message: 'Blessing is Creative',
        subject: 'Creative Discourse',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error').eql('user is required');
        done();
      });
  });
});

// Received Messages
describe('GET /messages', () => {
  it('should return a status of 200 and show all received messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages')
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        done();
      });
  });
});


// Unread Received Messages
describe('GET /unread/messages', () => {
  it('should return a status of 200 and show all received messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/unread/messages')
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        done();
      });
  });
});
