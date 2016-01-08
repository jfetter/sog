import express from "express";
import User from "../models/user";
import moment from "moment";
import jwt from "jwt-simple";
const router = express.Router();



/* \\\\\\\\Makes JWT (export later)\\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, 'secret');
}

/* \\\\\\\\\\Export me and import me plz\\\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

router.get('/all', (req, res) => {
  User.find({}, (err, users) => {
    res.status(err ? 400:200).send(err || users)
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.status(err ? 400:200).send(err || user)
  });
});

router.post('/register', (req, res) => {
  let user = new User(req.body);
  user.save((err, savedUser) => {
    res.status(err ? 400:200).send(err || savedUser);
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email },'password', function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
      User.findOne({email: req.body.email}, function (err, userData) {
        userData.password = null
        res.status(err ? 400:200).send(err || {user: userData, token: createJWT(user) });
      })

    });
  });
});

router.put('/update/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, err => {
    res.status(err ? 400:200).send(err || req.body);
  });
});

router.delete('/delete/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    res.status(err ? 400:200).send(err || { response: `User ${user.name} Deleted` });
  });
});

export default router;
