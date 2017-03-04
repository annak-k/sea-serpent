var express = require('express')
var router  = express.Router()

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "#569496",
    name: "Sea Serpent",
    head_url: "https://gurupets.com/img/items/RainbowCupcake.gif", // optional, but encouraged!
    taunt: "Watch my splash!", // optional, but encouraged!
    head_type: "smile",
    tail_type: "curled",
    secondary_color: "#d0a95d"
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move

  // Response data
  var data = {
    move: 'up', // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  return res.json(data)
})

module.exports = router
