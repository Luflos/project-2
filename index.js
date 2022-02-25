const express = require("express");
const app = express();
const ejsLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.use(ejsLayouts);
const port = 8000

// GET / - main index
app.get ('/', (req, res) => {
  res.send('hello there')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})