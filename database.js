/* Projet n°6 "PIIQUANTE"
*  Cours OpenClassrooms
*  par Manuel MILLET le 26 septembre 2022 à 12h00
*
*   initialisatio Base de Donnée Mongoose
*/

const mongoose = require('mongoose');

const uri = "mongodb+srv://manuel:<password>@cluster0.iwisneb.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log('Connected to DataBase !!'))
  .catch((err) => console.error('Error connecting to DataBase: ', err));