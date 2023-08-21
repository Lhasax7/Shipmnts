const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    body: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    is_deleted: {
      type: Boolean,
      default: false,
    },
  });
  
  module.exports = mongoose.model('Answer', answerSchema);
    