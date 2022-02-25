const express = require("express"); // import express
const app = express();    // create an express instance
const ejsLayouts = require("express-ejs-layouts");  // import ejs layouts
require('dotenv').config() // allows us to access env variables

// MIDDLEWARE
app.set("view engine", "ejs");  // set the view engine to ejs
app.use(ejsLayouts);  // tell express we want to use layouts
const PORT = process.env.PORT || 8000  // check for an env PORT, otherwise use 8000

// ROUTES
// GET / - main index
app.get ('/', (req, res) => {
  res.render('home.ejs')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})