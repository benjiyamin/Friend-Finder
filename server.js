const path = require('path')

const express = require('express')


const app = express()
const PORT = 8080


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())


app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'public/home.html'))
})


app.get('/survey', function (request, response) {
  response.sendFile(path.join(__dirname, 'public/survey.html'))
})


app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT)
})