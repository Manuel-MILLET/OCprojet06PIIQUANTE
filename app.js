 /* Projet n°6 "PIIQUANTE"
*  OpenClassrooms
*  par Manuel MILLET le 03 octobre 2022 à 20h00
*  fichier app.js
*/
const express = require('express');
const app = express();
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');
const mongoose = require('mongoose');// OK

mongoose.connect('mongodb+srv://manuel:manu3409@cluster0.iwisneb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('La connexion à MongoDB a réussie !'))
  .catch(() => console.log('La connexion à MongoDB a échouée !'));

app.use(express.json());
// **** CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// exportation de l'application
module.exports = app;
// FIN