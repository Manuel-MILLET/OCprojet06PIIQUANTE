 /* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 03 octobre 2022 à 20h00
*  fichier controllers/stuff.js
*/
const Thing = require('../models/Thing');
const fs = require('fs');

// Création d'un objet
exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;
  const thing = new Thing({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
  .then(() => { res.status(201).json({ message: 'Element saved successfully!'})})
  .catch(error => res.status(400).json({ error }));
};

//Lecture d'un objet a partir de son Identifiant _id
exports.getOneThing = (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    })
    .then((thing) => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

//Modification d'un objet déjà enregistré
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  delete thingObject._userId;
  Thing.findOne({_id: req.params.id})
    .then((thing) => {
        if (thing.userId != req.auth.userId) {
            console.log('err 401 ctrl-stuff ligne 42');
            res.status(401).json({ message : 'Not authorized !!!!'});
        } else {
            Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Updated !!!!'}))
            .catch(error => 
              res.status(401).json({ error }));
              console.log('err 401 ctrl-stuff ligne 49');
        }
    })
    .catch((error) => res.status(400).json({ error }));
};

//Supression d'un objet déjà enregistré
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
  .then(thing => {
      if (thing.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = thing.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Thing.deleteOne({_id: req.params.id})
                .then(() =>  res.status(200).json({message: 'Objet supprimé !'}))
                .catch(error => 
                  res.status(401).json({ error }));
                  console.log('err 401 ctrl-stuff ligne 68');
          });
      }
  })
  .catch(error => res.status(500).json({ error }));
};

//Lire tous les objets enregistrés
exports.getAllThings = (req, res, next) => {
    Thing.find()
    .then((things) => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};
// fin