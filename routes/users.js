import express from "express";
import User from "../models/user";
const router = express.Router();

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
