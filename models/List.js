const mongoose = require('mongoose');
const VocabListSchema = new mongoose.Schema({
  thisWeekswords: [
  {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Vocabulary',
  }
]
})
module.exports = mongoose.model('VocabList', VocabListSchema);