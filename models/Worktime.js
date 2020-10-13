const mongoose = require('mongoose');
const { Schema } = mongoose;

const worktimeSchema = new Schema({
  date: Date,
  project: String,
  start: String,
  end: String,
  pause: String,
  comment: String
});

mongoose.model('worktimes', worktimeSchema);
