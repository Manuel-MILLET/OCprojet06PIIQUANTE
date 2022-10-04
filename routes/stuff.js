/* Projet n°6 cours OpenClassrooms "go-fullstack"
*  par Manuel MILLET le 03 octobre 2022 à 20h00
*  fichier routes/stuff.js
*/
// Constantes
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

// Routes
router.get('/', auth, stuffCtrl.getAllThings);//Lire tous les objets enregistrés
router.post('/', auth, multer, stuffCtrl.createThing);// Création d'un objet
router.get('/:id', auth, stuffCtrl.getOneThing);//Lecture d'un objet a partir de son Identifiant _id
router.put('/:id', auth, multer, stuffCtrl.modifyThing);//Modification d'un objet déjà enregistré
router.delete('/:id', auth, stuffCtrl.deleteThing);//Supression d'un objet déjà enregistré

// exportation de l'application
module.exports = router;
// fin