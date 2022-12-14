/* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier models/Sauces.js
*/
const mongoose = require('mongoose');

// Schema des données pour les sauces
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true, default : "" },//Identifiant MongoDB unique de l'utilisateur qui a créé la sauce
    name: { type: String, required: true, default : "" },//Nom de la sauce
    manufacturer: { type: String, required: true, default : "" },//Fabricant de la sauce
    description: { type: String, required: true, default : "" },//Description de la sauce
    mainPepper: { type: String, required: true, default : "" },//Epice principal de la sauce
    imageUrl: { type: String, required: true, default : "" },//Url de l'image de la sauce téléchargée par l'utilisateur
    heat: { type: Number, required: true, default : 0 },//Nombre entre un et dix décrivant la sauce
    likes: { type: Number, required: true, default: 0 },//Nombre d'utilisateur qui ont aimé la sauce
    dislikes: { type: Number, required: true, default: 0 },//Nombre d'utilisateur qui n'ont pas aimé la sauce
    usersLiked: { type: Array, required: true, default : [] },//Tableau des identifiants des utilisateus qui ont aimé la sauce
    usersDisliked: { type: Array, required: true, default: [] }////Tableau des identifiants des utilisateus qui n'ont pas aimé la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema);
//fin