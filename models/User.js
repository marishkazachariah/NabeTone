const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
