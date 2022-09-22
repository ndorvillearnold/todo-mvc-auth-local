const mongoose = require('mongoose')

//structure we are creating
const TodoSchema = new mongoose.Schema({
  todo: {  //back
    type: String,
    required: true,
  },
  completed: {   //reversed for teacher cards
    type: Boolean,
    required: true,
  },
  //logged in user at that time
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
