const express = require('express')
const router = express.Router()
const vocabularyController = require('../controllers/vocabulary')

//go to middleware and you will see auth infomration
const { ensureAuth } = require('../middleware/auth')


//People always make mistake with this ROUTE <form action="/vocabulary/createVocabulary" method="POST">   
// router.get('/createVocabulary', ensureAuth, vocabularyController.getVocabulary) for login page with auth
router.get('/createVocabulary', vocabularyController.getVocabulary)

router.post('/createVocabulary', vocabularyController.createVocabulary)

// router.put('/markComplete', vocabularyController.markComplete)

// router.put('/markIncomplete', vocabularyController.markIncomplete)

// router.delete('/deleteTodo', vocabularyController.deleteTodo)

module.exports = router

// server talks to router
// router talks to controllers
// contoller talks to both model and views
// to loop all around
// view talks back to the server (submitting forms, etc)


