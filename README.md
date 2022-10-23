# Introduction

A Simple ToDo App is built using the MVC Architecture, we have also implemented "authorization" so folx can sign up, customize & personalize the app

---

> Be sure to add that lovely star 😀 and fork it for your own copy

---

# Objectives

- It's a beginner level app created to understand how MVC concept and logins are added

---

# Who is this for?

- It's for beginners & intermediates with little more experience, to help understand the various aspects of building a node app with some complex features

---

# Packages/Dependencies used

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install`

---

# console log so i can see whats coming on the screen to see if all the pages are connected


server talks to router
router talks to controllers
contoller talks to both model and views
to loop all around
view talks back to the server (submitting forms, etc)

only add auth if need to authenticate






# Things to add

-tailwind images

- Create a `.env` file and add the following as `key: value`

  - PORT: 2121 (can be any port example: 3000)
  - DB_STRING: `your database URI`

  ***

  -session

Is for people to come back to page with

PLEASE NOTE: The routes passes to the controller that runs the methods that talks to the DB

Have fun testing and improving it! 😎

//remove at some point
work on model first/ documents i will store in DB create schema (look ather DOC)
once we have models we have place holders..

when teacher clicks link( get)request) she want the card view

front end - then model

1. teacher creates cards / list
2. they input the list of cards
3. server - do a get request with collectiona name
4. have people in groups (6th grade, 7th grade)
   time card created -unique ID with who created
   card view needs model of its OWN model
   creates card how is it visible for student



   //signup page appear but dont sign anyone up

   can add cosmetic for messages "are you sure your a teacher"
   go through auth and comment what i expect lines (PUSH)
