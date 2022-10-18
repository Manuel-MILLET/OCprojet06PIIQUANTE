
# OCprojet06PIIQUANTE
initialisation du projet Open classrooms n°06  PIIQUANTE
# Introduction

# Dotenv
Dotenv permet de travailler avec des variables d'environnement et sécuriser les mots de passe d'un backend node.js.

La documentation de dotenv se trouve ici : https://www.npmjs.com/package/dotenv .

Vous devez inscrire les variables suivantes dans un fichier .env dans le dosier princiapl
Il doit contenir:

# DB_USERNAME=xxxxxxxx
DB_USERNAME doit contenir le nom de l'utilisateur de la base de données mongodb Atlas dans https://cloud.mongodb.com/

# DB_USERPASSWORD=xxxxxxx
DB_USERPASSWORD doit contenir le mot de pass de l'utilisateur de la base de données mongodb

# DB_USERDATABASEHOST=yyyyyyyyy 
DB_USERDATABASEHOST doit contenir le host de la base de données mongodb ex: cluster0.iwisneb.mongodb.net/

# DB_USERDATABASENAME=yyyyyyyyyyyyyy 
DB_USERDATABASENAME doit contenir le nom de la base données de l'utilisateur  ex:myFirstDatabase
 
# DB_SECRETSTRING=zzzzzzzzzzzzzzz
DB_SECRETSTRING doit contenir une chaine de caractère secrete ex: Lorem Ipsum is simply dummy...

Pour le fonctionnement de cette application,

vous devez disposer du frontend openclassrooms disponible sur https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6

puis dans un terminal dans le dossier du frontend, lancez "ng serve".

Pour visualiser le résultat du front-end ouvrez un navigateur puis insérez dans la barre URL:
localhost:4200

# Coté backend
node.js tout d'abord pour initialiser le repo;

installez les modules suivant via npm install
express et mongoose pour mongoDB avec mongoose-unique-validator, cors, dotenv, multer, bcrypt, jsonwebtoken et fs

piiquante est un site d'avis gastronomiques
Nous pouvons ici poster des sauces : une route sauce est ajoutée avec un controller (un middleware);

Nous pouvons aussi y enregistrer des likes ou des dislikes;

Le site web est authentifiée par utilisateur et mot de passe (route auth);

Principaux modules courants de node.js utilisés ici
Node.js
Nous utilisons ici node.js pour construire le backend et ainsi ajouter les modules nécéssaires déja cités, et décrits plus haut.


Dans le dossier de ce backend, dans un terminal lancez "nodemon server", en ayant les clés stockées dans les variables d'environnement.

Express()
Nous utilisons express() pour la configuration du router. Express est un module de node.js et un framework JS. Express permet d'appliquer le CRUD à notre application.

Mongoose
Mongoose facilite la communication avec une base de donnée mongoDB ; mongoose est conçu pour node.js dont il est un module. Créer un schéma, appliquer le CRUD avec notre base de donnée, tout est possible avec Mongoose. Utilisation de dotenv pour securiser l'acces a mongoDB.

Multer
Multer récupère et stocke sur le serveur les fichiers envoyés par les utilisateurs. Ici, il est configuré de manière à stocker dans le dossier images/ les images de sauces proposées par chaque utilisateur.

# Modules de sécurité

dotenv
dans le fichier server.js, il vous faudra installer le code:

require('dotenv').config();

Un fichier nommé tout simplement ".env" stockera les données sensibles qui ne pourront pas être partagées publiquement sur GitHub par exemple.

Helmet
Helmet permet a l'application de respecter les recommandations OWASP.

JWT : JSON Web Tokens
JWT est un module node.js qui permet de crypter les tokens d'authentification envoyés au client pour authentifier leur session, selon une clé définie par le développeur. Cette clé est généralement stockée dans le fichier .env.
dans le projet :
# DB_SECRETSTRING=zzzzzzzzzzzzzzz
DB_SECRETSTRING doit contenir une chaine de caractère secrete ex: Lorem Ipsum is simply dummy...

bcrypt
Bcrypt permet de faire un "hash" du mot de passe du client, de maniere a ce que cette chaine de caractère ne soit pas stockées coté serveur (mais seulement ce hash). Ainsi lorsque l'utilisateur se connecte avec son mot de passe, ce mot de passe est de nouveau haché et comparé au hash du serveur. Si les deux hash viennent du même mot de passe, les hash se reconnaitront.

Email-validator et password-validator