 /* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 05 octobre 2022 à 20h00
*  fichier controllers/stuff.js
*/
const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création d'un objet
exports.createSauce = (req, res, next) => {
  //console.log(req.body)
  const SauceObject = JSON.parse(req.body.sauce);
  delete SauceObject._id;
  delete SauceObject._userId;
  const sauce = new Sauce({
    ...SauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
  .then(() => { res.status(201).json({ message: 'Element saved successfully!'})})
  .catch(error => res.status(400).json({ error }));
};

//Lecture d'un objet a partir de son Identifiant _id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    })
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

//Modification d'un objet déjà enregistré
exports.modifySauce = (req, res, next) => {
  const SauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  delete SauceObject._userId;
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized !!!!'});
        } else {
            Sauce.updateOne({ _id: req.params.id}, { ...SauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Updated !!!!'}))
            .catch(error => 
              res.status(401).json({ error }));
        }
    })
    .catch((error) => res.status(400).json({ error }));
};

//Supression d'un objet déjà enregistré
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
      if (sauce.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Sauce.deleteOne({_id: req.params.id})
                .then(() =>  res.status(200).json({message: 'Objet removed !!!!'}))
                .catch(error => 
                  res.status(401).json({ error }));
          });
      }
  })
  .catch(error => res.status(500).json({ error }));
};

//Lire tous les objets enregistrés
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => {res.status(200).json(sauces)})
    .catch(error => res.status(400).json({ error }));
};
// fin