/* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier models/User.js
*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema des données pour les utilisateurs
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, default : "" },//Adresse e-mail (UNIQUE) de l'utilisateur
  password: { type: String, required: true, default : "" }//Mot de passHACHE de l'utilisateur
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
//fin