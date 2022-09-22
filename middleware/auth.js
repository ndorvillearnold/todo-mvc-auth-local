module.exports = {
  ensureAuth: function (req, res, next) {

    //when they make a get request, if user logged in NEXT if NOT redirest to the main page 
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  }
}
