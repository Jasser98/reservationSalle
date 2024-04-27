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
router.get('/update/:id', reservationController.getUpdate);

router.post('/update/:id', reservationController.updateReservation);

//delete 
router.get('/:id', reservationController.getdeletereservation);

router.delete('/:id', reservationController.deleteReservation);


module.exports = router;
