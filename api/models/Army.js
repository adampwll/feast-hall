const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArmySchema = new Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  faction: {
    type: String,
  },
  points: {
    type: String,
  },
  created_at:
  {
    type: Date, default: Date.now
  }
});

module.exports = Army = mongoose.model('Army', ArmySchema);