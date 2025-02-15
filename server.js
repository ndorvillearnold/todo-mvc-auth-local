const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

//It keeps us logged in even if we leave
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const vocabularyRoutes = require('./routes/vocabulary')
const studentlistRoutes = require('./routes/studentlist')

require('dotenv').config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')

//any file we put in,  we wont need to add public path since we have public here
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions enable us so you dont have to enter it again
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoutes)
app.use('/vocabulary', vocabularyRoutes)
app.use('/studentlist', studentlistRoutes)



app.listen(process.env.PORT, () => {
  console.log('Server is running, you better catch it!')
})    