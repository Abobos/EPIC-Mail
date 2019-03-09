
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('POST /api', () => {
  it('should return 201 status when user details are valid', (done) => {
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
});
