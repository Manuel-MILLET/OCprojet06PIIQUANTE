/* Projet n°6 "PIIQUANTE"
*  Cours OpenClassrooms ""
*  par Manuel MILLET le 25 septembre 2022 à 20h00
*/
// Initialisation des constantes
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.post("/api/auth/signup", (req, res) => {
    console.log('Signup request:', req.body);
    res.send("Utilisateur enregistré !");// à tester avec la méthode .end
});
app.get('/', (req, res) => {
    res.send('SERVER OK !!');// à tester avec la méthode .end
});
app.listen(port, () => {
    console.log('Le server de l\'application PIIQUANTE écoute sur le port 3000');
});