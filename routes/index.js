const router = require("express").Router();
const AudioFile = require('../models/AudioFile');

// TODO get all audio files


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
