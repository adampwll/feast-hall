const express = require("express");
const router = express.Router();
const Army = require('../models/Army');

router.post("/", (req, res) => {
    const newArmy = new Army({
      name: req.body.name,
      faction: req.body.faction,
      points: req.body.points,
      userId: req.body.user_id
    });
    newArmy.save().then(army => res.json(army));
    return res
  });

router.patch("/update", (req, res) => {
  const filter = { _id: req.body._id };
  const update = req.body;
  Army.findOneAndUpdate(filter, update, { new: true })
    .then(army => res.json(army))
    .catch(err => res.status(400).json({ unableToUpdate: err}))
})

router.get("/index/:userId", (req, res) => {
  Army.find({ "userId": `${req.params.userId}`})
    .then(armies => res.json(armies))
    .catch(err => res.status(404).json({ noArmiesFound: err }))
});

router.get("/show/:armyId", (req, res) => {
  Army.findOne({ "_id": `${req.params.armyId}` })
    .then(army => res.json(army))
    .catch(err => res.status(404).json({ noArmiesFound: err }))
});

router.delete("/:id", (req, res) => {
  const filter = { "_id": `${req.params.id}` };
  Army.deleteOne(filter)
    .then(response => { console.log(`Deleted ${response.deletedCount} item.`); res.json(response.deletedCount)})
  .catch(err => console.error(`Delete failed with error: ${err}`))
  return req.params.id
});

module.exports = router