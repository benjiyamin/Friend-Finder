const assert = require('assert')

const mocha = require('mocha')

const Friend = require('../app/friend')
const getFriendsArrayFromJSON = require('../app/friend').getFriendsArrayFromJSON


const describe = mocha.describe
const it = mocha.it


describe('Friend()', function () {

  describe('.totalScore()', function () {

    it('should return the sum of all scores', function () {
      let scores = [1, 2, 3]
      let friend = new Friend(scores)
      let expected = 0
      scores.forEach(score => {
        expected += score
      });
      let produced = friend.totalScore()
      assert.equal(expected, produced)
    })

  })


  describe('.scoreDiff(friend)', function () {

    it('should return the difference in total scores', function () {
      let scores1 = [1, 1, 1]
      let friend1 = new Friend(scores1)
      let total1 = 0
      scores1.forEach(score => {
        total1 += score
      })

      let scores2 = [3, 3, 3]
      let friend2 = new Friend(scores2)
      let total2 = 0
      scores2.forEach(score => {
        total2 += score
      });
      let expected = Math.abs(total1 - total2)
      let produced = friend1.scoreDiff(friend2)
      assert.equal(expected, produced)
    })


    it('should return the same value between friends', function () {
      let scores1 = [1, 1, 1]
      let friend1 = new Friend(scores1)
      let scores2 = [3, 3, 3]
      let friend2 = new Friend(scores2)
      let produced1 = friend1.scoreDiff(friend2)
      let produced2 = friend2.scoreDiff(friend1)
      assert.equal(produced1, produced2)
    })

  })


  describe('.bestMatch(friend)', function () {

    it('should return exact matches', function () {
      let friendsJSON = [{
        "name": "1",
        "photo": "https://via.placeholder.com/150",
        "scores": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      }, {
        "name": "2",
        "photo": "https://via.placeholder.com/150",
        "scores": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
      }, {
        "name": "3",
        "photo": "https://via.placeholder.com/150",
        "scores": [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
      }, {
        "name": "4",
        "photo": "https://via.placeholder.com/150",
        "scores": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
      }, {
        "name": "5",
        "photo": "https://via.placeholder.com/150",
        "scores": [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
      }]


      let scores = friendsJSON[2].scores
      let friend = new Friend(scores)
      let friends = getFriendsArrayFromJSON(friendsJSON)

      let expected = scores
      let produced = friend.bestMatch(friends).scores
      assert.equal(expected, produced)
    })


    it('should return close matches', function () {
      let friendsJSON = [{
        "name": "1",
        "photo": "https://via.placeholder.com/150",
        "scores": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      }, {
        "name": "2",
        "photo": "https://via.placeholder.com/150",
        "scores": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
      }, {
        "name": "3",
        "photo": "https://via.placeholder.com/150",
        "scores": [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
      }, {
        "name": "4",
        "photo": "https://via.placeholder.com/150",
        "scores": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
      }, {
        "name": "5",
        "photo": "https://via.placeholder.com/150",
        "scores": [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
      }]


      let scores = [3, 3, 2, 3, 2, 3, 2, 3, 3, 3]
      let friend = new Friend(scores)
      let friends = getFriendsArrayFromJSON(friendsJSON)

      let expected = friendsJSON[2].scores
      let produced = friend.bestMatch(friends).scores
      assert.equal(expected, produced)
    })

  })

})