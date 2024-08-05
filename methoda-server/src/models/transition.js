const mongoose = require('mongoose');

const transitionSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  fromStatus: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true },
  toStatus: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true }
});


const Transition = mongoose.models.Transition || mongoose.model('Transition', transitionSchema);

module.exports = Transition;

