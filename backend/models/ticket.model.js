const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  wallet_id: { type: Number, required: true },
  stations: [
    {
      station_id: { type: Number, required: true },
      train_id: { type: Number, required: true },
      arrival_time: { type: String },
      departure_time: { type: String },
    },
  ],
});

const Ticket = mongoose.model("ticket", ticketSchema);
module.exports = Ticket;
