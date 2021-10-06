const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true 
  },
  password: String,
  audioFiles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'AudioFile',
    },
  ]
});

const User = model("User", userSchema);

module.exports = User;
