const { Schema, model } = require("mongoose");

const audioFileSchema = new Schema({
  title: String,
  audioPath: String,
  audioName: String,
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  location: {
    address: {
      street: String,
      postalCode: String,
      city: String,
    },
  },
});

const AudioFile = model("AudioFile", audioFileSchema);

module.exports = AudioFile;
