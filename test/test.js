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
  it('should create a new user Bob', function(done) {
    chai.request(app)
    .post('/user/register')
    .send({
      email:"bob@bob.com",
      password:"password",
      name:"Bob Bobbing",
      address:"341 Bob Lane, Bob St.",
    })
    .end(function(err, res){
      if(err) console.error(err);
      console.log(res.body);
      expect(res.body.email).to.equal('bob@bob.com')
      expect(res.body.name).to.equal('Bob Bobbing')
      expect(res.body.address).to.equal("341 Bob Lane, Bob St.")
      done();
    })
  })

  it('should create a new user Steve', function(done) {
    chai.request(app)
    .post('/user/register')
    .send({
      email:"steve@steve.com",
      password:"password",
      name:"Steve Steveing",
      address:"252 Steve Lane, Steve St.",
    })
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.email).to.equal('steve@steve.com')
      expect(res.body.name).to.equal('Steve Steveing')
      expect(res.body.address).to.equal("252 Steve Lane, Steve St.")
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
      address:"252 Jenn Lane, Jen St.",
    })
    .end(function(err, res){
      if(err) console.error(err);
      expect(res.body.email).to.equal('Jenny@jenny.com')
      expect(res.body.name).to.equal('Jenny Jennison')
      expect(res.body.address).to.equal("252 Jenn Lane, Jen St.")
      done();
    })
  })
})
