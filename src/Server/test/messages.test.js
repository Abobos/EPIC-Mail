
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();


describe('Signup two users', () => {
  it('should return a status of 201 when user has signup', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Gift',
        lastName: 'Abobo',
        email: 'giftabobo@gmail.com',
        password: 'precious',
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

  it('should return a status of 201 when user has sign up', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'Blessing',
        lastName: 'Makaraba',
        email: 'blessingmakaraba@gmail.com',
        password: 'blue333',
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
});

let senderToken = '';
let receiverToken = '';
let wrongToken = '';
describe('Generate Token', () => {
  it('generate a token', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'giftabobo@gmail.com',
        password: 'precious',
      })
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.property('token');
        senderToken = res.body.data[0].token;
        [wrongToken] = senderToken.split('.');
        done();
      });
  });

  it('generate a token', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'blessingmakaraba@gmail.com',
        password: 'blue333',
      })
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.property('token');
        receiverToken = res.body.data[0].token;
        done();
      });
  });
});

// Send Messages
describe('POST /messages', () => {
  it('should return a status of 200 when message is sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer ${senderToken}`)
      .send({
        subject: 'Andela',
        message: 'We provide opportunity',
        email: 'blessingmakaraba@gmail.com',
      })
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.an('object');
        done();
      });
  });

  it('should return a status of 400 when receiver\'s mail does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .set('Authorization', senderToken)
      .send({
        subject: 'Andela',
        message: 'We provide opportunity',
        email: 'victoryabobo@gmail.com',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should return a status of 401 when token is wrong', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer ${wrongToken}`)
      .send({
        subject: 'Andela',
        message: 'We provide opportunity',
        email: 'blessingmakaraba@gmail.com',
      })
      .end((req, res) => {
        res.should.have.status(401);
        res.should.be.an('object');
        res.body.should.have.property('message').eql('auth failed');
        done();
      });
  });

  it('should return a status of 400 when subject is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer ${senderToken}`)
      .send({
        message: 'we provide opportunity',
        email: 'blessingmakaraba@gmail.com',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('subject is required');
        done();
      });
  });

  it('should return a status of 400 when message is not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer ${senderToken}`)
      .send({
        subject: 'Creative Discourse',
        email: 'blessingmakaraba@gmail.com',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('message is required');
        done();
      });
  });

  it('should return a status of 400 when email is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer ${senderToken}`)
      .send({
        subject: 'Creative Discourse',
        email: 'blessingmakaraba@gmail',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error').eql('email is not valid');
        done();
      });
  });

  it('should return a status of 400 when receive found', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer ${senderToken}`)
      .send({
        message: 'Blessing is Creative',
        subject: 'Creative Discourse',
      })
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error');
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
      .set('Authorization', `Bearer ${receiverToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        done();
      });
  });

  it('should return a status of 200 and display a message of inbox is empty', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages')
      .set('Authorization', `Bearer ${senderToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('message').eql('Inbox is empty');
        done();
      });
  });
});


// Unread Received Messages
describe('GET /messages/unread', () => {
  it('should return a status of 200 when message is sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer ${senderToken}`)
      .send({
        subject: 'Andela',
        message: 'Brilliance is evenly distributed',
        email: 'blessingmakaraba@gmail.com',
      })
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.an('object');
        done();
      });
  });

  it('should return a status of 200 and show all unread received messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/unread')
      .set('Authorization', `Bearer ${receiverToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        done();
      });
  });

  it('should return a status of 200, show all received messages and change status of messages to read', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages')
      .set('Authorization', `Bearer ${receiverToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        done();
      });
  });

  it('should return a status of 200 and display no unread messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/unread')
      .set('Authorization', `Bearer ${senderToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('message').eql('No unread messages');
        done();
      });
  });
});

// Sent Messages
describe('GET /messages/sent', () => {
  it('should return a status of 200 and show all sent messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/sent')
      .set('Authorization', `Bearer ${senderToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        done();
      });
  });

  it('should return a status of 200 and display No sent messages', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/sent')
      .set('Authorization', `Bearer ${receiverToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('message').eql('No sent messages');
        done();
      });
  });
});

// Specific Email Record
describe('GET /messages/<message-id>', () => {
  it('should return a status of 200 when message with the given id is found', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/1')
      .set('Authorization', `Bearer ${senderToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
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

  it('should return a status of 404 when message with the given Id is not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/messages/9')
      .set('Authorization', `Bearer ${senderToken}`)
      .end((req, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error');
        done();
      });
  });
});


describe('DELETE /messages/<message-id>', () => {
  it('should return a status of 200 when message with the given id is found', (done) => {
    chai
      .request(app)
      .delete('/api/v1/messages/1')
      .set('Authorization', `Bearer ${senderToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.an('array');
        res.body.data[0].should.have.property('message');
        done();
      });
  });

  it('should return a status of 404 when message with the given Id is not found', (done) => {
    chai
      .request(app)
      .delete('/api/v1/messages/9')
      .set('Authorization', `Bearer ${senderToken}`)
      .end((req, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql('failed');
        res.body.should.have.property('error');
        done();
      });
  });
});
