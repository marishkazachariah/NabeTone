const router = require("express").Router();
const AudioFile = require("../models/AudioFile");
const fileUploader = require("../config/cloudinary");

// get all audio files
router.get("/", (req, res, next) => {
  AudioFile.find()
    .then((audioFiles) => {
      console.log(audioFiles);
      res.status(200).json(audioFiles);
    })
    .catch((err) => next(err));
});

// POST '/api/upload' => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
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
	const { title, audioPath } = req.body;
  console.log(req.body);
	AudioFile.create({
		title,
		audioPath,
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

router.delete('/:id', (req, res, next) => {
	AudioFile.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'project deleted' });
		})
});

module.exports = router;
