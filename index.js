const express = require("express"); // import express
const app = express();    // create an express instance
const ejsLayouts = require("express-ejs-layouts");  // import ejs layouts
const cookieParser = require('cookie-parser')
require('dotenv').config() // allows us to access env variables
const cryptoJS = require('crypto-js');
const db = require("./models/index.js");

// MIDDLEWARE
app.set("view engine", "ejs");  // set the view engine to ejs
app.use(ejsLayouts);  // tell express we want to use layouts
app.use(cookieParser()) // gives us access to req.cookies
app.use(express.urlencoded({ extended: false })) // body parser (to make req.body work)
const PORT = process.env.PORT || 8000  // check for an env PORT, otherwise use 8000

// CUSTOM LOGIN MIDDLEWARE
app.use( async (req, res, next) => {
  if (req.cookies.userId) {
    // decrypting the incoming user id from the cookie
    const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
    // converting the decrypted id into a readable string
    const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
    // querying the db for the user with that id
    const user = await db.user.findByPk(decryptedIdString)
    // assigning the found user to res.locals.user in the routes, and user in the ejs
    res.locals.user = user
  } else res.locals.user = null
  next()  // move on to the next middleware
})

// CONTROLLERS
app.use('/users', require('./controllers/users.js'))


// ROUTES
// GET / - main index
app.get ('/', (req, res) => {
  res.render('home.ejs')
})

app.get('*', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})