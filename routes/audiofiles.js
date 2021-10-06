const router = require("express").Router();
const AudioFile = require("../models/AudioFile");
const fileUploader = require("../config/cloudinary");
const User = require("../models/User");

// get all audio files
router.get("/", (req, res, next) => {
  AudioFile.find()
    .then((audioFiles) => {
      // console.log(audioFiles);
      res.status(200).json(audioFiles);
    })
    .catch((err) => next(err));
});

// get user's audio files
router.get("/useraudio/:id", (req, res, next) => {
  AudioFile.find({ author: req.user._id })
  .then((audioFiles) => {
    console.log(audioFiles);
    res.status(200).json(audioFiles)
  })
  .catch((err) => next(err));
});

router.post("/upload", fileUploader.single("audioPath"), (req, res, next) => {
  // console.log('file is: ', req.file)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend
  res.json({ secure_url: req.file.path });
});

// create an audio file
router.post('/tones/add', (req, res, next) => {
	const { title, audioPath, location } = req.body;
  console.log(req.body);
	AudioFile.create({
		title,
		audioPath,
    location,
    author: req.user._id,
	})
		.then(audioFile => {
			// we return http status code 201 - created
			res.status(201).json(audioFile);
		})
		.catch(err => {
			next(err);
		})
})


router.get("/:id", (req, res, next) => {
  AudioFile.findById(req.params.id)
    .then((audioFile) => {
      if (!audioFile) {
        res.status(404).json(audioFile);
      } else {
        res.status(200).json(audioFile);
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => {
	const { title, audioPath } = req.body;
	AudioFile.findByIdAndUpdate(req.params.id, { title: title, audioPath: audioPath }, { new: true })
		.then(updatedProject => {
			res.status(200).json(updatedProject);
		})
		.catch(err => next(err));
});

// Deletion of audio file without cloudinary

// router.delete('/:id', (req, res, next) => {
//   const audioFileId = req.params.id;  
// 	AudioFile.findByIdAndDelete(audioFileId)
// 		.then(() => {
// 			res.status(200).json({ message: 'project deleted' });
// 		})
//     .catch(err => next(err))
// });

router.delete('/:id', (req, res, next) => {
  AudioFile.findByIdAndDelete(req.params.id)
      .then(() => {
        fileUploader.destroy(`${req.params.id}`, function(error, result) {
          console.log(result, error) });
          res.status(200).json({ message: 'audio file deleted' });
      })
      .catch(err => next(err));
});

module.exports = router;
