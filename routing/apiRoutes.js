const fs = require('fs')

const questions = require('../app/data/questions')
const Friend = require('../app/friend')
const getFriendsArrayFromJSON = require('../app/friend').getFriendsArrayFromJSON


function getFriendsJSON() {
  // Return new promise 
  return new Promise(function (resolve, reject) {
    // Do async job
    fs.readFile('./app/data/friends.json', function (error, data) {
      if (error) {
        reject(error)
      } else {
        let response = JSON.parse(data)
        resolve(response)
      }
    })
  })
}


module.exports = function (app) {

  app.get('/api/friends', function (request, response) {
    getFriendsJSON()
      .then(function (friends) {
        response.json(friends)
      })
  })

  app.post('/api/friends', function (request, response) {
    getFriendsJSON()
      .then(function (friends) {
        let newFriend = request.body
        for (let i = 0; i < newFriend.scores.length; i++) {
          const score = newFriend.scores[i]
          newFriend.scores[i] = parseInt(score)
        }

        let newUser = new Friend(newFriend.scores, newFriend.name, newFriend.photo)
        let existingUsers = getFriendsArrayFromJSON(friends)
        let bestMatch = newUser.bestMatch(existingUsers)

        friends.push(newFriend)
        let data = JSON.stringify(friends)
        fs.writeFile('./app/data/friends.json', data, function (error) {
          if (error) throw error
          response.json(bestMatch)
        })
      })
  })

  app.get('/api/questions', function (request, response) {
    response.json(questions);
  })

}