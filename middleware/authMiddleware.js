/*
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authenticate = (req, res, next) => {
  const token = req.cookies.authToken; // Récupérer le token depuis le cookie

  if (!token) {
    return res.status(401).send('Authentication failed: No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded._id }; // Ajouter userId à req.user
    next();
  } catch (error) {
    return res.status(401).send('Authentication failed: Invalid token');
  }
};

module.exports = authenticate;
*/

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  // 1. Récupérer le token depuis le cookie
  const token = req.cookies.authToken;

  // 2. Si aucun token n'est présent, refuser l'accès
  if (!token) {
    return res.status(401).send('Authentication failed: No token provided');
  }

  // 3. Décoder le token et extraire l'ID utilisateur
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    // 4. Rechercher l'utilisateur dans la base de données
    const user = await User.findById(userId);

    // 5. Si l'utilisateur n'existe pas, refuser l'accès
    if (!user) {
      return res.status(401).send('Authentication failed: User not found');
    }

    // 6. Injecter l'objet `req.user` avec l'ID et le rôle de l'utilisateur
    req.user = { _id: userId, role: user.role };

    // 7. Autoriser l'accès à la suite du middleware
    next();
  } catch (error) {
    // 8. Gérer les erreurs de décodage ou de recherche d'utilisateur
    return res.status(401).send('Authentication failed: Invalid token');
  }
};

module.exports = authenticate;
