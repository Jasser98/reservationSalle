const express = require('express');
const sale = require('../models/salle');
const reservation = require('../models/reservation');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { salleId, date, startTime, endTime } = req.body;

        // Vérifie si la salle est disponible
        const salle = await sale.findById(salleId);

        if (!salle || salle.available === false) {
            return res.status(400).json({ message: "La salle n'est pas disponible pour la réservation." });
        }
        else if (salle.available){
            // Créer la réservation
            const Reservation = new reservation({ salleId, date, startTime, endTime });
            await Reservation.save();
            // Mettre à jour la disponibilité de la salle
            salle.available = false;
            await salle.save();
            return res.status(201).json({ message: 'Réservation créée avec succès.' });
        } 
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la création de la réservation.' });
    }
});

router.post('/updateReservationAvailability', async (req, res) => {
    
})

module.exports = router;
