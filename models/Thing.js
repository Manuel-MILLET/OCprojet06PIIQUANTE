/* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 03 octobre 2022 à 20h00
*  fichier Thing.js
*/
const mongoose = require('mongoose');

// Schema des données
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Thing', thingSchema);// OK
//fin