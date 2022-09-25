const express = require('express')
const router = express.Router()
const studentlistController = require('../controllers/studentlist')

//go to middleware and you will see auth infomration
const { ensureAuth } = require('../middleware/auth')


//People always make mistake with this ROUTE <form action="/student/createstudent" method="POST">   
// router.get('/createstudent', ensureAuth, studentController.getstudent) for login page with auth
router.get('/createStudentlist', studentlistController.getStudentlist)

router.post('/createStudentlist', studentlistController.createStudentlist)

// router.put('/markComplete', studentlistController.markComplete)

// router.put('/markIncomplete', studentlistController.markIncomplete)

// router.delete('/deleteTodo', studentlistController.deleteTodo)

module.exports = router


