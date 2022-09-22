const mongoose = require('mongoose');
const VocabularySchema = new mongoose.Schema({
  word: {
    type: String,
  },
  definition: {
    type: String,
  },
})
module.exports = mongoose.model('Vocabulary', VocabularySchema);