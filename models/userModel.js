const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true,'Please provide a password'],
    select:false
  },
  bio: {
    type: String,
    default: ''
  },
  profilePicture: {
    type: String,
    default: ''
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
UserSchema.pre('save',async function(next){
  if(!this.isModified('password'))
    return next();
  this.password = await bcrypt.hash(this.password,12);
  next();
})

UserSchema.methods.correctPassword = async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword);
}
module.exports = mongoose.model('User', UserSchema);
