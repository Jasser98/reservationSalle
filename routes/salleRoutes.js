const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const salleController = require('../controllers/salleController');
const router = express.Router();


//get all
router.get('/', authenticate, salleController.getAllSalles);

//router  create
router.get('/nouvelle', salleController.getCreateSalle);

router.post('/addSalle', authenticate, salleController.addSalle);

//update
router.get('/update/:id',  salleController.getUpdateSalle); 

router.post('/update/:id', authenticate, salleController.updateSalle);

//delete
router.delete('/:id', authenticate, salleController.deleteSalle);

router.get('/:id', authenticate, salleController.getdeleteSalle);


module.exports = router;