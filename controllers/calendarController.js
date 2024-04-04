const Salle = require('../models/salle');
const Reservation = require('../models/reservation');

exports.getCalendar = async (req, res) => {
  try {
    // Fetch all rooms
    const salles = await Salle.find();

    // Fetch reservations for each room
    const salleReservations = await Promise.all(
      salles.map(async (salle) => {
        const reservations = await Reservation.find({ salleId: salle._id });
        return { salle, reservations };
      })
    );

    res.render('calendar', { salleReservations }); // Render the 'calendar' view with rooms and reservations
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des salles et des réservations pour le calendrier.' });
  }
};
