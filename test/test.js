import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";
import request from "superagent";

chai.use(chaiHttp);

const expect = chai.expect;
const chaiApp = chai.request(app);

describe('basic route', function() {
  it('/', function() {
    chaiApp
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.test).to.equal("Hello World");
      });
  });
});

describe('register new users', function() {

  var userIds = { Bob:' ', Steve:' ', Jenny:'' }


  it('should create a new user Bob', function(done) {
    chai.request(app)
    .post('/user/register')
    .send({
      email:"bob@bob.com",
      password:"password",
      name:"Bob Bobbing",
      phone:"555-555-5555",
      address:"341 Bob Lane, Bob St."
    })
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.email).to.equal('bob@bob.com')
      expect(res.body.name).to.equal('Bob Bobbing')
      expect(res.body.phone).to.equal('555-555-5555')
      expect(res.body.address).to.equal("341 Bob Lane, Bob St.")
      userIds.Bob = res.body._id
      done();
    })
  })

  /* Registration test, creates user with email, password, name phone number, and address
  ////////////////////////////////////////////////////////////////////////////////////////
  */

  it('should create a new user Steve', function(done) {
    chai.request(app)
    .post('/user/register')
    .send({
      email:"steve@steve.com",
      password:"password",
      name:"Steve Steveing",
      phone:"555-555-5555",
      address:"252 Steve Lane, Steve St."
    })
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.email).to.equal('steve@steve.com')
      expect(res.body.name).to.equal('Steve Steveing')
      expect(res.body.phone).to.equal('555-555-5555')
      expect(res.body.address).to.equal("252 Steve Lane, Steve St.")
      userIds.Steve = res.body._id
      done();
    })
  })

  it('should create a new user Jenny', function(done) {
    chai.request(app)
    .post('/user/register')
    .send({
      email:"Jenny@jenny.com",
      password:"password",
      name:"Jenny Jennison",
      phone:"555-555-5555",
      address:"252 Jenn Lane, Jen St."
    })
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.email).to.equal('Jenny@jenny.com')
      expect(res.body.name).to.equal('Jenny Jennison')
      expect(res.body.phone).to.equal('555-555-5555')
      expect(res.body.address).to.equal("252 Jenn Lane, Jen St.")
      userIds.Jenny = res.body._id
      done();
    })
  })

  it('should update a user Bobs phone, name, address', function(done) {
    chai.request(app)
    .put(`/user/update/${userIds.Bob}`)
    .send({
      name:"Bob Updated",
      phone:"444-444-4444",
      address:"252 Bob Lane, Updated St."
    })
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.name).to.equal('Bob Updated')
      expect(res.body.phone).to.equal('444-444-4444')
      expect(res.body.address).to.equal("252 Bob Lane, Updated St.")
      done();
    })
  })

  /* Update test, updates users phone number, name and address
  ///////////////////////////////////////////////////////////
  */
  it('should update a user Bobs phone, name, address', function(done) {
    chai.request(app)
    .put(`/user/update/${userIds.Bob}`)
    .send({
      name:"Bob Updated",
      phone:"444-444-4444",
      address:"252 Bob Lane, Updated St."
    })
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.name).to.equal('Bob Updated')
      expect(res.body.phone).to.equal('444-444-4444')
      expect(res.body.address).to.equal("252 Bob Lane, Updated St.")
      done();
    })
  })

  it('should update a user Steves phone, name, address', function(done) {
    chai.request(app)
    .put(`/user/update/${userIds.Steve}`)
    .send({
      name:"Steve Updated",
      phone:"444-444-4444",
      address:"252 Steve Lane, Updated St."
    })
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.name).to.equal('Steve Updated')
      expect(res.body.phone).to.equal('444-444-4444')
      expect(res.body.address).to.equal("252 Steve Lane, Updated St.")
      done();
    })
  })

  it('should update a user Jennys phone, name, address', function(done) {
    chai.request(app)
    .put(`/user/update/${userIds.Jenny}`)
    .send({
      name:"Jenny Updated",
      phone:"444-444-4444",
      address:"252 Jenny Lane, Updated St."
    })
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.name).to.equal('Jenny Updated')
      expect(res.body.phone).to.equal('444-444-4444')
      expect(res.body.address).to.equal("252 Jenny Lane, Updated St.")
      done();
    })
  })
  /* Deletion test, should remove a user from the database
  ///////////////////////////////////////////////////////////
  */
  it('should delete a user Bob', function(done) {
    chai.request(app)
    .delete(`/user/delete/${userIds.Bob}`)
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.response).to.equal('User Bob Deleted')
      done();
    })
  })

  it('should delete a user Steve', function(done) {
    chai.request(app)
    .delete(`/user/delete/${userIds.Steve}`)
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.response).to.equal('User Steve Deleted')
      done();
    })
  })

  it('should delete a user Jenny', function(done) {
    chai.request(app)
    .delete(`/user/delete/${userIds.Jenny}`)
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.response).to.equal('User Jenny Deleted')
      done();
    })
  })

})
