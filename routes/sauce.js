/* Projet n°6 cours OpenClassrooms "go-fullstack"
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier routes/sauce.js
*/
// Constantes
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controllers/stuff');

// Routes
router.get('/', auth, stuffCtrl.getAllSauces);//Lire tous les objets enregistrés
router.post('/', auth, multer, stuffCtrl.createSauce);// Création d'un objet
router.get('/:id', auth, stuffCtrl.getOneSauce);//Lecture d'un objet a partir de son Identifiant _id
router.put('/:id', auth, multer, stuffCtrl.modifySauce);//Modification d'un objet déjà enregistré
router.delete('/:id', auth, stuffCtrl.deleteSauce);//Supression d'un objet déjà enregistré

// Exportation de l'application
module.exports = router;
// fin