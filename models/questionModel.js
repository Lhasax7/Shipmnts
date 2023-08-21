const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [{
      type: String,
    }],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    answers: [{
      type: Schema.Types.ObjectId,
      ref: 'Answer',
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    is_deleted: {
      type: Boolean,
      default: false,
    },
  });
  
  module.exports = mongoose.model('Question', questionSchema);