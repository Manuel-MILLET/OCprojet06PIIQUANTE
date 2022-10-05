 /* Projet n°6 cours OpenClassrooms "go-fullstack"
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier middleware/auth.js
*/
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
    try {
       const token = req.headers.authorization.split(' ')[1];
       console.log('mid-auth ligne 10 token',token);
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       console.log('mid-auth ligne 12 decodedToken',decodedToken);
       const userId = decodedToken.userId;
       console.log('mid-auth ligne 14 userId',userId);
       req.auth = { userId: userId };
        next();
    }catch(error) {
    res.status(401).json({ error });
    }
};
//fin