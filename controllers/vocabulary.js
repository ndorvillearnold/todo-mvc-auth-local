const Vocabulary = require('../models/Vocabulary')

module.exports = {
    getVocabulary: async (req, res) => {
        console.log(req.user)
        try {
            //return array
            let vocabularyWord = await Vocabulary.find()
            //ejs parsing through the information .. I can change what page looks like with this code
            console.log(vocabularyWord)
            // we made a list now passing to ejs / views

            //got "data"" from line 8 on EJS file,  stored it in this variable (vocabularyWord)above line 8
            // <%= data  %>  coming from page vocabulary.ejs file.....   
            res.render('vocabulary.ejs', { data: vocabularyWord })
        } catch (err) {
            //console.log(err)     = { vocabularyItem: 'test1' }
        }
    },
    createVocabulary: async (req, res) => {
        try {
            // console.log(req.body)  to see whats redering
            //referecing mongose model ( for word and definition)
            // req.body will be what comes on the screen
            await Vocabulary.create({

                word: req.body.Vocabulary,
                definition: req.body.Definition,
            })
            //home page
            res.redirect('/')

        } catch (err) {
            console.log(err)
        }
    },
    //     markComplete: async (req, res) => {
    //         try {
    //             await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
    //                 completed: true
    //             })
    //             console.log('Marked Complete')
    //             res.json('Marked Complete')
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     },
    //     markIncomplete: async (req, res) => {
    //         try {
    //             await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
    //                 completed: false
    //             })
    //             console.log('Marked Incomplete')
    //             res.json('Marked Incomplete')
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     },
    //     deleteTodo: async (req, res) => {
    //         console.log(req.body.todoIdFromJSFile)
    //         try {
    //             await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile })
    //             console.log('Deleted Todo')
    //             res.json('Deleted It')
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
}    