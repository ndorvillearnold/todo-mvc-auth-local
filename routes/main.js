const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const vocabularyController = require('../controllers/vocabulary')

//People always make mistake with this ROUTE <form action="/vocabulary/createVocabulary" method="POST">   
// router.get('/', vocabularyController.getVocabulary)

router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

// router.post('/cards', authController.cards)



// let input = document.querySelector('#search')
// input.addEventListener('keyup', filterWords)

// function filterWords() {
//     let div = document.querySelectorAll('.card')
//     let txtValue;
//     let filter = input.value.toUpperCase();
//     let h2 = document.querySelectorAll('h2')
//     console.log(div[0])
//     for (i = 0; i < h2.length; i++) {
//         txtValue = h2[i].innerText;

//     }
// }




module.exports = router