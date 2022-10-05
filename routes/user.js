 /* Projet n°6 cours OpenClassrooms "go-fullstack"
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier routes/user.js
*/
// Constantes
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// Exportation de l'application
module.exports = router;
//fin