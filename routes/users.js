import express from "express";
import User from "../models/user";
import moment from "moment";
import jwt from "jwt-simple";

const router = express.Router();

// Makes JWT (export later)
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, 'secret');
}


//Export me and import me plz
router.get('/all', (req, res) => {
  User.find({}, (err, users) => {
    res.status(err ? 400:200).send(err || users)
  });
});

router.get('/poked/:id', (req, res) => {
  let userId = req.params.id;
  console.log('req params id', userId);
  User.findById( userId, (err, foundUser) => {
    res.status(err ? 400:200).send(err || foundUser.pokes)
  }).populate('pokes')
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.status(err ? 400:200).send(err || user)
  });
});

router.post('/currentUser', (req, res) => {
  var decoded = jwt.decode(req.body.userToken, 'secret');
  User.findById(decoded.sub, (err, user) => {
    user.password = null;
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

router.post("/poke", (req, res) => {
  let poked = req.body.poked;
  let poker = req.body.poker;

  console.log(req.body)
  // DO YOU NEED A LIST OF ALL THE IDS OF ALL THE POKED ONES?
  User.findById(poker, (err, user) => {
    if(err) res.status(400).send(err.message);
    user.pokes.push(poked);
    user.save(user, (err, savedUser) => {
      User.findOne({ _id: savedUser._id }, (err, foundUser) => {
        console.log(foundUser);
          res.status(err ? 400:200).send(err || foundUser.pokes);
      }).populate('pokes');
    });
  });
});

router.post("/unpoke", (req, res) =>{
  var poked = req.body.poked;
  var poker = req.body.poker;
  console.log(req.body)
  res.status(200).send(poked);
  // REMOVE FROM LIST OF POKED ONES
  // User.findByIdAndUpdate(poker, {$set: pokeds}, err => {
  //   res.status(err ? 400:200).send(err || req.body);
  // })
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
