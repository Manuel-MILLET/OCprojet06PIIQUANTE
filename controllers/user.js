 /* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 08 octobre 2022 à 12h00
*  fichier controllers/users.js
*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Inscription d'un utilisateur dans la base de donnée
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User ({
               email: req.body.email,
               password: hash 
            });
            user.save()
                .then(() => res.status(201).json({ message: 'user created !!!!' }))
                .catch(error => res.status(400).json({ error }));
			})
        .catch(error => res.status(500).json({ error }));
};

// Authentification et validation de la connexion d'un utilisateur déjà inscrit
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'User not found !!!!' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Bad password or login: User not connected:' });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id},
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                 )  
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }   
        })
        .catch(error => res.status(500).json({ error }));
};
// Fin du fichier controllers/user.js