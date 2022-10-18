 /* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier middleware/auth.js
*/
// Initialisation des constantes
const jwt = require('jsonwebtoken');
const secretString = process.env.DB_SECRETSTRING;
 
module.exports = (req, res, next) => {
    try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, secretString);
       const userId = decodedToken.userId;
       req.auth = { userId: userId };
        next();
    }catch(error) {
        res.status(401).json({ error });
    }
};
//fin  