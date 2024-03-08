const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId ,
    capacity : Number ,
    equipment:String,
    available : {type:Boolean,default: true},
});

const salle = mongoose.model('Salle', salleSchema);
module.exports = salle;