const mongoose = require('mongoose');
const { Schema } = mongoose;

const TimeslotSchema = new Schema({
  days: { type: [Number], required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

module.exports = TimeslotSchema;
