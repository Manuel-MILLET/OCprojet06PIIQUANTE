 /* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier routes/user.js
*/
// Constantes
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// Routes POST pour les utilisateurs
router.post('/signup', userCtrl.signup);// Inscription d'un utilisateur dans la base de donnée
router.post('/login', userCtrl.login);// Connexion d'un utilisateur dans la base de donnée
// Exportation de l'application
module.exports = router;
//fin