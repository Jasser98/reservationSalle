const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

//calendrier
router.get('/ca', calendarController.getCalendar);

module.exports = router;
