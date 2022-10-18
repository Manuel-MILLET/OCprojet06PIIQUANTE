 /* Projet n°6 "PIIQUANTE"
*  OpenClassrooms
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier app.js
*/

//initialisation des constantes
const express = require('express');
const app = express();
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const mongoose = require('mongoose');
// Initialisatiion des constantes d'environement UTILISATEUR enregistrées dans le fichier  .env
const userNameForMongodb = process.env.DB_USERNAME;
const userPwsForMongodb = process.env.DB_USERPASSWORD;
const userHostForMongodb = process.env.DB_USERDATABASEHOST;
const userDataBaseName = process.env.DB_USERDATABASENAME;
const test = 'mongodb+srv://' + userNameForMongodb + ':' + userPwsForMongodb + '@' + userHostForMongodb + userDataBaseName + '?retryWrites=true&w=majority';

mongoose.connect('mongodb+srv://' + userNameForMongodb + ':' + userPwsForMongodb + '@' + userHostForMongodb + userDataBaseName + '?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('La connexion à MongoDB a réussi !'))
  .catch(() => console.log('La connexion à MongoDB a échoué !'));

// **** CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// exportation de l'application
module.exports = app;
// FIN