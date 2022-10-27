const passport = require('passport')
const validator = require('validator')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')


exports.getLogin = (req, res) => {
  // if(req.user){
  //   if (req.user.type === "teacher") {
  //     res.redirect('/vocabulary')
  //   } else {

  //     res.redirect('/studentlist')
  //   }
  // }

  res.render('login', {
    title: 'Login'
  })
}

/* -------------------------------------------------------------------------- */
/*  User must enter a password if not flash message appears                   */
/* -------------------------------------------------------------------------- */
exports.postLogin = (req, res, next) => {

  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('/login')
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })


  /* -------------------------------------------------------------------------- */
  /*  If not a user redirect them to login
  /* -------------------------------------------------------------------------- */
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login')
    }

    /* -------------------------------------------------------------------------- */
    /*  If user is a teacher route to /vocab  else /student
    /* -------------------------------------------------------------------------- */
    req.logIn(user, (err) => {

      if (err) { return next(err) }
      if (req.user.type === 'teacher') {
        res.redirect("/vocabulary/createVocabulary")
      } else {
        res.redirect("/studentlist/createStudentlist")
      }
      req.flash('success', { msg: 'Success! You are logged in.' })

    })
  })(req, res, next)
}

/* -------------------------------------------------------------------------- */
/* User logs out 
/* -------------------------------------------------------------------------- */
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    res.redirect('/')
  })
}

exports.getSignup = (req, res) => {
  //if already an existing user
  // if (req.user) {
  //   if (req.user.type !== "teacher") {
  //     res.redirect('/studentlist/createStudentlist')
  //   } else {
  //     res.redirect('/vocabulary/createVocabulary')
  //   }
  // }
  res.render('signup', {
    title: 'Create Account'
  })
}

// exports.cards = (req, res) => {
//   if (req.user) {
//     return res.redirect('/cards')
//   }
//   res.render('cards', {
//     title: 'definition'
//   })
// }

exports.postSignup = (req, res, next) => {
  console.log(req.body)
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('../signup')
  }
  req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

  if (req.body.TeacherVerification === 'on') {
    const user = new Teacher({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      type: 'teacher'
    })
    console.log(user)
    Teacher.findOne({

      $or: [
        { email: req.body.email },
        { userName: req.body.userName },
      ]
    }, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      //not req.user because the user.type is not made yet
      if (user.type === "teacher") {
        user.save((err) => {
          if (err) { return next(err) }
          req.logIn(user, (err) => {
            if (err) {
              return next(err)
            }
            res.redirect('/vocabulary/createVocabulary')
          })
        });
      } else {
        user.save((err) => {
          if (err) { return next(err) }
          req.logIn(user, (err) => {
            if (err) {
              return next(err)
            }
            res.redirect('/studentlist/createStudentlist')
          })
        })
      }
    })
    // If student -> 
  } else {
    console.log('student')
    //adding capital Student from Model
    //We have the recipie and under making data for the repicie and data from formsS
    const user = new Student({

      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      type: 'student',

    });

    Student.findOne({
      $or: [
        { email: req.body.email },
        { userName: req.body.userName }
      ]
    }, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      //student never have to create
      // user.save((err) => {
      //   if (err) { return next(err) }
      //   req.logIn(user, (err) => {
      //     if (err) {
      //       return next(err)
      //     }
      //     res.redirect('/vocabulary/createVocabulary')
      //   })
      // })
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/studentlist/createStudentlist')
        })
      })
    })

  }
}

