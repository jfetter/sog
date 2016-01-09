import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String, require: true , unique: false },
  password: { type: String, require: true },
  name: { type: String, require: true },
  address: { type: String, require: true },
  phone: {type: String, require: true },
  avatar: {type: String , require: false}
});

userSchema.pre('save', function(next) {
  let user = this;

  if(!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
}

let User = mongoose.model('User', userSchema);

export default User;
