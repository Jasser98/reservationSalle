const sale = require('../models/salle');
const User = require('../models/user'); 
const reservation = require('../models/reservation');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raefbelhaj54@gmail.com',
        pass: 'iwda zsna pipy rajf'
    }
});

// get All Res 
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservation.find();
        res.render('reservations', { reservations });
        //res.json(reservations);
    } catch (error) {
        res.status(404).send(error.message)
    }
}

//get by id
exports.getReservationById = async (req, res) => {
    try {
        const Reserva = await reservation.findById(req.params.id);
        res.json(Reserva);
    } catch (error) {
            res.status(404).send(error.message)
    }
}

// front create 
exports.getCreate = async (req, res) => {
    try {
        // Ici vous pouvez récupérer des données nécessaires pour le formulaire, par exemple la liste des salles
        const salles = await sale.find({ available: true });

        // Rendre la vue EJS avec les données
        res.render('createReservation', { salles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des données.' });
    }
};
//create
exports.create = async (req, res) => {
    try {
        const userId = req.user._id; // Récupérer l'ID de l'utilisateur authentifié
        const { salleId, startTime, endTime } = req.body;

        // Vérifie si la salle est disponible
        const salle = await sale.findById(salleId);
        if (!salle) {
            return res.status(400).json({ message: "La salle n'est pas disponible." });
        }

        // Vérifier la disponibilité du créneau
        const existingReservation = await reservation.findOne({
            salleId,
            $or: [
                { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
                { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
                { startTime: { $gte: startTime }, endTime: { $lte: endTime } }
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ message: "Le créneau sélectionné est déjà réservé." });
        }

        // Créer la réservation
        const newReservation = new reservation({ salleId, startTime, endTime });
        await newReservation.save();

        // Mettre à jour la disponibilité de la salle
        salle.available = false;
        await salle.save();

        // Récupérer l'e-mail de l'utilisateur
        const user = await User.findById(userId);
        const userEmail = user.email;

        // Définir la date de la réservation
        const date = new Date().toLocaleDateString();

        // Envoyer un e-mail de confirmation à l'utilisateur
        const mailOptions = {
            from: 'raefbelhaj54@gmail.com',
            to: userEmail,
            subject: 'Confirmation de réservation',
            html: `<p>Votre réservation pour la salle a été confirmée. Date: ${date}, Heure de début: ${startTime}, Heure de fin: ${endTime}</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log('E-mail de confirmation envoyé');

        res.render('confirmation'); // Afficher une page de confirmation

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la création de la réservation.' });
    }
}

//get update front : 
exports.getUpdate = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const reservationn = await reservation.findById(reservationId);
        if (!reservationn) {
            return res.status(404).json({ message: "La réservation spécifiée n'a pas été trouvée." });
        }
        res.render('updateReservation', { reservation :reservationn});
    } catch (error) {
        console.error(error);
        //.status(500).json({ message: 'Erreur serveur lors de la récupération des données pour la mise à jour de la réservation.' });
    }
};

//update res 
exports.updateReservation = async (req, res) => {
    const { salleId, startTime, endTime } = req.body;
    try {
        const updatedReservation = await reservation.findByIdAndUpdate(req.params.id, { salleId, startTime, endTime }, { new: true });
        
        if (!updatedReservation) {
            return res.status(404).json({ message: "La réservation spécifiée n'a pas été trouvée." });
        }

        res.status(200).json(updatedReservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la réservation.' });
    }
}

//Delete 
exports.deleteReservation = async (req, res) => {
    try {
        await reservation.findByIdAndDelete(req.params.id);
    } catch (error) {
        res.status(404).send(error.message)
    }
};

//deleteFront
exports.getdeletereservation = async (req, res) => {
    try {
      const Reservation = await reservation.findById(req.params.id);
      res.json(Reservation);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };