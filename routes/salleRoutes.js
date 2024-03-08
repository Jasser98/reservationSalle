const express = require('express');
const salle = require('../models/salle');
const router = express.Router();

router.get('',async (req,res)=>{
    const salles = await salle.find();
        res.json(salles);
});

router.get('/:id', async (req, res) => {
    try {
        const Salle = await salle.findById(req.params.id);
        res.json(Salle);
    } catch (error) {
            res.status(404).send(error.message)
    }
});    

router.post('/addSalle', async (req, res) => {
    try {
        const { capacity, equipment, available } = req.body;
        const newSalle = new salle({ capacity, equipment, available  });
        await newSalle.save();
        res.status(201).send('Salle added successfully');
    } catch (error) {
        res.status(404).send(error.message)
    }   
});

router.put('/update/:id', async (req, res) => {
    try {
        const { capacity, equipment, available } = req.body;
        await salle.findByIdAndUpdate(req.params.id, { capacity, equipment, available }, { new: true });
        res.status(201).send('Salle updated successfully');
    } catch (error) {
        res.status(404).send(error.message)
    }
});    

router.delete('/:id', async (req, res) => {
    try {
        await salle.findByIdAndDelete(req.params.id);
        res.status(201).send('Salle deleted successfully');
    } catch (error) {
        res.status(404).send(error.message)
    }
});


module.exports = router;