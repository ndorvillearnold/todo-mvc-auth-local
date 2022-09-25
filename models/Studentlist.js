const mongoose = require('mongoose');
const StudentlistSchema = new mongoose.Schema({
    word: {
        type: String,
    },
    definition: {
        type: String,
    },
})
module.exports = mongoose.model('Studentlist', StudentlistSchema);