 /* Projet n°6 cours OpenClassrooms "PIIQUANTE"
*  par Manuel MILLET le 08 octobre 2022 à 12h00
*  fichier controllers/sauce.js
*/
const Sauce = require('../models/Sauce');
const fs = require('fs');

// Définition du status "LIKE"
exports.likeSauce = (req, res, next) => {
  const sauceId = req.params.id;// identifiant de la sauce likée ou dislikée
  const userId = req.body.userId;// identifiant de l'utilisateur qui veut liker ou disliker
  const like = req.body.like;// valeure du like ( -1, 0 , 1)
  console.log('DATA LIKE liste:');
  console.log('l ID de la sauce à LIKER/DISLIKER est : ', sauceId);
  console.log('l ID de l utilisateur est :', userId);
  console.log('le like demandé est : est :', like);
  //console.log('Les LIKES sont à  : ',sauce.likes);
  //console.log('Les DISLIKES sont à  : ',sauce.dislikes);
  //console.log('Les userLiked sont à  : ',sauce.usersLiked);
  //console.log('Les userdisLiked sont à  : ',sauce.usersDisliked);

  if (![-1,0,1].includes(like)) {// ici la valeure du like est # de -1, 0 ou 1
    console.log('like value not autorised !!!!');
    res.status(401).json({ message : 'like value not autorised !!!!'});
    return;
  }

  if (like === 1) {// Ici l'utilisateur aime "LIKE" la sauce, like = 1
    Sauce.updateOne(
      { _id: sauceId },
      { $inc: { likes: like },  $push: { usersLiked: userId } }
    )
    .then((sauce) => res.status(200).json({ message: "Sauce liked !" }))
    .catch((error) => res.status(500).json({ error }));

  }

  if (like === -1) {// Ici l'utilisateur n'aime pas "DISLIKE" la sauce, like = -1
    Sauce.updateOne(
      { _id: sauceId },
      { $inc: { likes: like },  $push: { usersDisliked: userId } }
    )
    .then((sauce) => res.status(200).json({ message: "Sauce disliked !" }))
    .catch((error) => res.status(500).json({ error }));

  } else {// Ici l'utilisateur a changé d'avis sur la sauce, like = 0
   Sauce.findOne({ _id: sauceId })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then((sauce) => res.status(200).json({ message: "Sauce disliked !" }))
            .catch((error) => res.status(500).json({ error }));

        } else if (sauce.usersDisliked.includes(userId)) {// Ici l'utilisateur a changé d'avis sur le dislike (j'aime pas)
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }}
            )
            .then((sauce) => res.status(200).json({ message: "Sauce disliked !" }))
            .catch((error) => res.status(500).json({ error }));
        }
      })
      .catch((error) => res.status(401).json({ error }));

  }
};

// Création d'une sauce
exports.createSauce = (req, res, next) => {
  const SauceObject = JSON.parse(req.body.sauce);
  delete SauceObject._id;
  delete SauceObject._userId;
  const sauce = new Sauce({
    ...SauceObject,
    userId: req.auth.userId,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce
    .save()
    .then(() => { res.status(201).json({ message: 'Element saved successfully!'})})
    .catch(error => res.status(400).json({ error }));
};

//Affichage des informations d'une sauce a partir de son Identifiant _id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

//Modification d'une sauce déjà enregistrée par l'utilisateur autorisé (celui qui l'a créée)
exports.modifySauce = (req, res, next) => {
  const SauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  delete SauceObject._userId;
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({ message : ' User not authorized !!!!'});
        } else {
            Sauce.updateOne({ _id: req.params.id}, { ...SauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Updated !!!!'}))
            .catch(error => 
              res.status(401).json({ error }));
        }
    })
    .catch((error) => res.status(400).json({ error }));
};

//Supression d'une sauce déjà enregistrée
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({_id: req.params.id})
            .then(() =>  res.status(200).json({ message: 'Objet removed !!!!' }))
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//Affichage de toutes les sauces enregistrées
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {res.status(200).json(sauces)})
    .catch(error => res.status(400).json({ error }));
};
// fin