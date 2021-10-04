const { Schema, model } = require("mongoose");

const audioFileSchema = new Schema({
  title: String,
  audioPath: String,
  audioName: String,
  location: String, 
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const AudioFile = model("AudioFile", audioFileSchema);

module.exports = AudioFile;
