import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";
import request from "superagent";

chai.use(chaiHttp);

const expect = chai.expect;
const chaiApp = chai.request(app);
let userIds = { Bob:' ', Steve:' ', Jenny:'' };

describe('Test Route', function() {
  it('/', function() {
    chaiApp
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.test).to.equal("Hello World");
    });
  });
});

describe('Register The Users', function() {
  it('Should Create User Bob', function(done) {
    chaiApp
    .post('/user/register')
    .send({
      email:"bob@bob.com",
      password:"password",
      name:"Bob",
      phone:"555-555-5555",
      address:"341 Bob Lane, Bob St."
    })
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.email).to.equal('bob@bob.com');
      expect(res.body.name).to.equal('Bob');
      expect(res.body.phone).to.equal('555-555-5555');
      expect(res.body.address).to.equal("341 Bob Lane, Bob St.");
      userIds.Bob = res.body._id;
      done();
    });
  });

  it('Should Create User Steve', function(done) {
    chaiApp
    .post('/user/register')
    .send({
      email:"steve@steve.com",
      password:"password",
      name:"Steve",
      phone:"555-555-5555",
      address:"252 Steve Lane, Steve St."
    })
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.email).to.equal('steve@steve.com');
      expect(res.body.name).to.equal('Steve');
      expect(res.body.phone).to.equal('555-555-5555');
      expect(res.body.address).to.equal("252 Steve Lane, Steve St.");
      userIds.Steve = res.body._id;
      done();
    });
  });

  it('Should Create User Jenny', function(done) {
    chaiApp
    .post('/user/register')
    .send({
      email:"Jenny@jenny.com",
      password:"password",
      name:"Jenny",
      phone:"555-555-5555",
      address:"252 Jenn Lane, Jen St."
    })
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.email).to.equal('Jenny@jenny.com');
      expect(res.body.name).to.equal('Jenny');
      expect(res.body.phone).to.equal('555-555-5555');
      expect(res.body.address).to.equal("252 Jenn Lane, Jen St.");
      userIds.Jenny = res.body._id;
      done();
    });
  });
});

describe('Receive All The Users', function() {
  it('Should Receive Bob', function(done) {
    chaiApp
    .get(`/user/${userIds.Bob}`)
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.email).to.equal('bob@bob.com');
      expect(res.body.name).to.equal('Bob');
      expect(res.body.phone).to.equal('555-555-5555');
      expect(res.body.address).to.equal("341 Bob Lane, Bob St.");
      done();
    });
  });

  it('Should Receive Steve', function(done) {
    chaiApp
    .get(`/user/${userIds.Steve}`)
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.email).to.equal('steve@steve.com');
      expect(res.body.name).to.equal('Steve');
      expect(res.body.phone).to.equal('555-555-5555');
      expect(res.body.address).to.equal("252 Steve Lane, Steve St.");
      done();
    });
  });

  it('Should Receive Jenny', function(done) {
    chaiApp
    .get(`/user/${userIds.Jenny}`)
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.email).to.equal('Jenny@jenny.com');
      expect(res.body.name).to.equal('Jenny');
      expect(res.body.phone).to.equal('555-555-5555');
      expect(res.body.address).to.equal("252 Jenn Lane, Jen St.");
      userIds.Jenny = res.body._id;
      done();
    });
  });
});

describe('Update The Users', function() {
  it('Should Update Bobs Phone, Name, Address', function(done) {
    chaiApp
    .put(`/user/update/${userIds.Bob}`)
    .send({
      phone:"444-444-4444",
      address:"252 Bob Lane, Updated St."
    })
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.phone).to.equal('444-444-4444');
      expect(res.body.address).to.equal("252 Bob Lane, Updated St.");
      done();
    });
  });

  it('Should Update Steves Phone, Name, Address', function(done) {
    chaiApp
    .put(`/user/update/${userIds.Steve}`)
    .send({
      phone:"444-444-4444",
      address:"252 Steve Lane, Updated St."
    })
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.phone).to.equal('444-444-4444');
      expect(res.body.address).to.equal("252 Steve Lane, Updated St.");
      done();
    });
  });

  it('Should Update Jennys Phone, Name, Address', function(done) {
    chaiApp
    .put(`/user/update/${userIds.Jenny}`)
    .send({
      phone:"444-444-4444",
      address:"252 Jenny Lane, Updated St."
    })
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.phone).to.equal('444-444-4444');
      expect(res.body.address).to.equal("252 Jenny Lane, Updated St.");
      done();
    });
  });
});

describe('Delete The Users', function() {
  it('Should Delete Bob', function(done) {
    chaiApp
    .delete(`/user/delete/${userIds.Bob}`)
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.response).to.equal('User Bob Deleted');
      done();
    });
  });

  it('Should Delete Steve', function(done) {
    chaiApp
    .delete(`/user/delete/${userIds.Steve}`)
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.response).to.equal('User Steve Deleted');
      done();
    });
  });

  it('Should Delete Jenny', function(done) {
    chaiApp
    .delete(`/user/delete/${userIds.Jenny}`)
    .end(function(err, res) {
      if(err) console.error(err);
      expect(res).to.have.status(200);
      expect(res.body.response).to.equal('User Jenny Deleted');
      done();
    });
  });
});
