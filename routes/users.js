import express from "express";
import User from "../models/user";
const router = express.Router();

router.post('/register', (req, res) => {
  let user = new User(req.body);
  user.save(function(err, savedUser) {
    res.status(err ? 400:200).send(err || savedUser);
  })
});

export default router;
