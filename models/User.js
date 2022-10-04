/* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 02 octobre 2022 à 20h00
*  fichier User.js
*/
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },//Adresse e-mail (UNIQUE) de l'utilisateur
  password: { type: String, required: true }//Mot de passHACHE de l'utilisateur
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
//fin