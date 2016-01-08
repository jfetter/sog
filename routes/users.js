import express from "express";
import User from "../models/user";
const router = express.Router();

router.get('/', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.status(err ? 400:200).send(err || user)
  })
});

router.post('/register', (req, res) => {
  let user = new User(req.body);
  user.save((err, savedUser) => {
    res.status(err ? 400:200).send(err || savedUser);
  })
});

export default router;
