 /* Projet n°6 cours OpenClassrooms "go-fullstack"
*  par Manuel MILLET le 03 octobre 2022 à 20h00
*  fichier routes/user.js
*/

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
//fin