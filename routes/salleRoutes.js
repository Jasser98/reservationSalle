const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const salleController = require('../controllers/salleController');
const router = express.Router();

router.use(authenticate);




//get all
router.get('/', authenticate, salleController.getAllSalles);

//get by id
//router.get('/:id', authenticate, salleController.getSalleById);   



//router get create
router.get('/nouvelle', async (req, res) => {
  try {
    res.render('nouvelleSalle'); // Rend la vue 'nouvelleSalle.ejs'
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//router create
router.post('/addSalle', authenticate, salleController.addSalle);

//update
router.get('/update/:id',  salleController.getUpdateSalle); 


router.post('/update/:id', authenticate, salleController.updateSalle);

//delete
router.delete('/:id', authenticate, salleController.deleteSalle);

router.get('/:id', authenticate, salleController.getdeleteSalle);


module.exports = router;