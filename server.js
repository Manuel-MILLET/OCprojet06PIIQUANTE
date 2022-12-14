 /* Projet n°6 "PIIQUANTE"
*  OpenClassrooms
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier server.js
*/

// initialisation des constantes
require('dotenv').config();// Pour l'utilisation de variable d'environement dans le fichier .env
const http = require('http');// import du package 'HTTP' natif de Node 
const app = require('./app');
//la fonction normalizePort renvoie un port valide, 
//qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

//la fonction normalizePort renvoie un port valide
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//la fonction errorHandler recherche les différentes erreurs
//et les gère de manière appropriée. 
//Elle est ensuite enregistrée dans le serveur ;
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + 'Requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + 'Server is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
});

//Le server backend écoute le port 3000
server.listen(port);
// Fin du fichier server.js