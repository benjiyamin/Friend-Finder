
let arrSum = function (arr) {
  return arr.reduce(function (a, b) {
    return a + b
  }, 0)
}


function getFriendsArrayFromJSON(friendsJSON) {
  let output = []
  friendsJSON.forEach(friendJSON => {
    output.push(new Friend(friendJSON.scores, friendJSON.name, friendJSON.photo))
  });
  return output
}


function Friend(scores, name, photo) {
  this.scores = scores
  this.name = name
  this.photo = photo

  this.totalScore = function () {
    return arrSum(this.scores)
  }

  this.scoreDiff = function (friend) {
    return Math.abs(this.totalScore() - friend.totalScore())
  }

  this.bestMatch = function (friends) {
    let match
    friends.forEach(friend => {
      if (!match || this.scoreDiff(friend) < this.scoreDiff(match)) {
        match = friend
      }
    })
    return match
  }
}

module.exports = Friend
module.exports.getFriendsArrayFromJSON = getFriendsArrayFromJSON