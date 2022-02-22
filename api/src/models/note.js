// Require the mongoose library
const mongoose = require("mongoose");

// Define hte nore's database schema
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  // Assigns createAt and updateAt fields with a Date typeDef
  timestamps: true
});

// Define the 'Note' model with the schema
const Note = mongoose.model("Note", noteSchema);
// Export th module
module.exports = Note;
