/* Projet n°6 cours OpenClassrooms "go-fullstack"
*  par Manuel MILLET le 08 octobre 2022 à 20h00
*  fichier routes/sauce.js
*/
// Constantes
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

// Routes CRUD pour les sauces
router.get('/', auth, sauceCtrl.getAllSauces);// Affichage de toutes les sauces enregistrées dans la base de donnée
router.post('/', auth, multer, sauceCtrl.createSauce);// Création d'une sauce dans la base de donnée
router.get('/:id', auth, sauceCtrl.getOneSauce);// Affichage d'une sauce a partir de son Identifiant _id
router.put('/:id', auth, multer, sauceCtrl.modifySauce);// Modification, via son ID, d'une sauce déjà enregistrée, si elle a été créée par l'utilisateur
router.delete('/:id', auth, sauceCtrl.deleteSauce);// Supression d'une sauce déjà enregistrée
// Route pour les likes et dislikes
router.post('/:id/like', auth, sauceCtrl.likeSauce); // Définit le status "LIKE" ou "DISLIKE" pour une sauce par un utilisateur autorisé

// Exportation de l'application
module.exports = router;
// fin