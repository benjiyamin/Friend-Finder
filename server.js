const express = require('express')


const apiRoutes = require('./routing/apiRoutes')
const htmlRoutes = require('./routing/htmlRoutes')


const app = express()
const PORT = process.env.PORT || 8080


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())


apiRoutes(app)
htmlRoutes(app)


app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT)
})