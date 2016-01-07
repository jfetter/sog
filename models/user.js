'use strict';

import mongoose from "mongoose";
let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String, require: true , unique: false },
  password: { type: String, require: true },
  name: { type: String, require: true },
  address: { type: String, require: true },
  avatar: {type: String , require: false}
})

let User = mongoose.model('User', userSchema);

export default User;
