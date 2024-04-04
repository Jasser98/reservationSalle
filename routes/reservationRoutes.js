const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authenticate = require('../middleware/authMiddleware');


//get 
router.get('/', reservationController.getAllReservations);

//get id 
router.get('/:id', reservationController.getReservationById);

//create
router.get('/create/:id', authenticate, reservationController.getCreate);

router.post('/create', authenticate, reservationController.create);

//update
router.put('/update/:id', reservationController.updateReservation);


module.exports = router;
