const salle = require('../models/salle');

//get salles 
exports.getAllSalles = async (req, res) => {
    try {
        const salles = await salle.find();
        res.render('salles', { salles }); 
        //res.json(salles);
    } catch (error) {
        res.status(404).send(error.message)
}
}

//get salle by id 
exports.getSalleById = async (req, res) => {
    try {
        const Salle = await salle.findById(req.params.id);
        res.json(Salle);
    } catch (error) {
            res.status(404).send(error.message)
    }
}

//create salle 
exports.addSalle = async (req, res) => {
    try {
        const userRole = req.user.role;
        console.log(userRole);
        console.log(req.user);
        if (userRole !== 'admin') {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
        }

        const { name, capacity, equipment, available } = req.body;
        
        const newSalle = new salle({ name, capacity, equipment, available  });
        await newSalle.save();
        const salles = await salle.find();
        res.render('salles', { salles }); 
        //res.status(201).send('Salle added successfully');
    } catch (error) {
        res.status(404).send(error.message)
    }   
}

//update salle 
exports.getUpdateSalle = async (req, res) => {
    try {
      //voir user authentifier
      if (!req.user) {
        return res.status(401).json({ message: "Vous devez être connecté pour accéder à cette ressource." });
    }
    
    //Vérifier si l'utilisateur a le rôle d'administrateur
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
    }
      const Salle = await salle.findById(req.params.id);
      if (!Salle) {
        return res.status(404).json({ message: 'Salle not found' });
      }
      res.render('updateSalle', {salle: Salle }); // Render the 'updateSalle' view with salle data
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

exports.updateSalle = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
        }

        const { name, capacity, equipment } = req.body;
        const available = req.body.available === 'on';
        await salle.findByIdAndUpdate(req.params.id, { name, capacity, equipment, available }, { new: true });
        const salles = await salle.find();
        res.render('salles', { salles });
        // res.status(201).send({ message: 'Salle updated successfully', salle: updatedSalle });
    } catch (error) {
        res.status(404).send(error.message)
    }
}

//delete salle 
exports.deleteSalle = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
        }
        
        await salle.findByIdAndDelete(req.params.id);
        const salles = await salle.find();
        res.render('salles', { salles }); 
        //res.status(201).send('Salle deleted successfully');
    } catch (error) {
        res.status(404).send(error.message)
    }
}

// exports.getdeleteSalle = async (req, res) => {
//     try {
//       const Salle = await salle.findById(req.params.id);
//       res.json(Salle);
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   };
  
