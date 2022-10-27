const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
// const User = require('../models/Student')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')


/* -------------------------------------------------------------------------- */
/*        http://toon.io/understanding-passportjs-authentication-flow/        */
/* -------------------------------------------------------------------------- */

module.exports = function (passport) {
  passport.use(


    /* ------------------------------------------------------------------------------------------   */
    /* The LocalStrategy below constructor takes a verify function as an argument,                  */
    /* which accepts username and password as arguments.                                            */
    /* When authenticatinga request, the strategy parses a username and                             */
    /* password which are submitted via an HTML form to the web application                          */
    /*Local Strategy allows us to authenticate users by looking up their data in the app's database*/
    /* --------------------------------------------------------------------------   */

     

    new LocalStrategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => {

      // console.log(email)
      // console.log(password)
      console.log(req.body)
      if (req.body.TeacherVerification === "on") {


        /* -------------------------------------------------------------------------- 
          findone()  method returns a document rather than a cursor.
          Returns one document that satisfies the specified query criteria on the 
          collection or view. If multiple documents satisfy the query, this method returns 
          the first document according to the order        
        -------------------------------------------------------------------------- */
        Teacher.findOne({ email: email.toLowerCase() }, (err, user) => {
          if (err) {
            return done(err);
          }

          /* -------------------------------------------------------------------------- */
          /*                      if not already a user with an email then  add?                      */
          /* -------------------------------------------------------------------------- */
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }
          if (!user.password) {
            return done(null, false, {
              msg:
                "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
            });
          }


          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { msg: "Invalid email or password." });
          });
        });

      } else {

        Student.findOne({ email: email.toLowerCase() }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }
          if (!user.password) {
            return done(null, false, {
              msg:
                "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
            });
          }

          /* -------------------------------------------------------------------------- */
          /*              if password is a match then add if not send error             */
          /* -------------------------------------------------------------------------- */
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false, { msg: "Invalid email or password." });
          });
        });

      }


    }

    ))


  /* -----------------------------------------------------------------------------*/
  /*        Passport uses serializeUser function to persist user data             */
  /*        (after successful authentication) into session.                       */
  /*          */
  /* ---------------------------------------------------------------------------- */




  passport.serializeUser((user, done) => {
    done(null, user.id);
  });


  /* -------------------------------------------------------------------------- */
  /*    Function deserializeUser is used to retrieve user data from session.    */
  /* -------------------------------------------------------------------------- */
  passport.deserializeUser((id, done) => {
    Teacher.findById(id, (err, user) => done(err, user));
  });
  passport.deserializeUser((id, done) => {
    Student.findById(id, (err, user) => done(err, user));
  });

};
