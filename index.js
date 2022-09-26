/* Projet n°6 "PIIQUANTE"
*  Cours OpenClassrooms
*  par Manuel MILLET le 26 septembre 2022 à 12h00
*   fichier index.js
*
*/
// Initialisation des constantes
const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');

// Data Base Mongoose
const mongoose = require('mongoose');
const uri = 'mongodb+srv://manuel:manu3409@cluster0.iwisneb.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(uri)
  .then(() => console.log('Successful connection to the Mongoose database !!'))
  .catch((err) => console.error('Error connecting to DataBase: ', err));

// schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);
//const manuel = new User({name:'manuel', password:3409});
/*
manuel
    .save()
    .then(res => console.log('l\'utilisateur manuel est bien enregistré !', res))
    .catch((err) => console.log('l\'utilisateur manuel n\'a pas été enregistré !!', err));
console.log('Le profil de Manuel est : ', manuel);
*/

// Middleware
app.use(cors());
app.use(express.json());// permet de transformer(parser) les données json du body

// Routes
app.post("/api/auth/signup", (req, res) => {
    console.log('Signup request:', req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log({email,password});
    const user = new User({ email: email, password: password});
user
    .save()
    .then((res) => console.log('USER SIGNUP ok !!'))
    .catch((err) => console.log('USER NOT SIGNUP'))
    res.send("Utilisateur enregistré !" );
});
app.get('/', (req, res) => {
    res.send('Server connection successful !!');
});
app.listen(port, () => {
    console.log('Le server de l\'application PIIQUANTE écoute sur le port 3000');
});