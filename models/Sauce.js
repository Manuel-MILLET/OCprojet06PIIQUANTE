/* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 03 octobre 2022 à 20h00
*  fichier Sauces.js
*/
const mongoose = require('mongoose');

// Schema des données
const saucesSchema = mongoose.Schema({
    userId: { type: String, required: true},//Identifiant MongoDB unique de l'utilisateur qui a créé la sauce
    name: { type: String, required: true},//Nom de la sauce
    manufacturer: { type: String, required: true},//Fabricant de la sauce
    description: { type: String, required: true },//Description de la sauce
    mainPepper: { type: String, required: true },//Epice principal de la sauce
    imageUrl: { type: String, required: true },//Url de l'image de la sauce téléchargée par l'utilisateur
    heat: { type: Number, required: true },//Nombre entre un et dix décrivant la sauce
    likes: { type: Number, required: true },//Nombre d'utilisateur qui ont aimé la sauce
    dislikes: { type: Number, required: true },//Nombre d'utilisateur qui n'ont pas aimé la sauce
    usersLiked: { type: String, required: true },//Tableau des identifiants des utilisateus qui ont aimé la sauce
    usersDisliked: { type: String, required: true }////Tableau des identifiants des utilisateus qui n'ont pas aimé la sauce
});

module.exports = mongoose.model('Sauce', saucesSchema);
//fin