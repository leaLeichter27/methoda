const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  isInitial: { type: Boolean, default: false }
});

const Status = mongoose.models.Status || mongoose.model('Status', statusSchema);

module.exports = Status;