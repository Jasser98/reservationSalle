const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    salleId: { type: mongoose.Schema.Types.ObjectId, ref: 'salle' },
    startTime: Date,
    endTime: Date
});

const reservation = mongoose.model('Reservation', reservationSchema);
module.exports = reservation;
