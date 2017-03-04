var express = require('express')
var router  = express.Router()

var width = 0;
var height = 0;
var game_id = "";

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game
  // get height and width
  width = req.width;
  height = req.height;
  game_id = req.game_id;

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

function getMySnake(snakes, id) {
  for(s in snakes) {
    if(s.id == id) {
      return s;
    }
  } else {
    return false;
  }
}

function wallCheck(head, w, h) {
  var possible_moves = {"up": true, "left": true, "down": true, "right": true};

  if(head == [0,0]) {
    possible_moves.left = false;
    possible_moves.up = false;
  } else if(head == [0,h-1]) {
    possible_moves.left = false;
    possible_moves.down = false;
  } else if(head == [w-1, 0]) {
    possible_moves.right = false;
    possible_moves.up = false;
  } else if(head == [w-1, h-1]) {
    possible_moves.right = false;
    possible_moves.down = false;
  } else if(head[0] == 0) {
    possible_moves.left = false;
  } else if(head[0] == w-1) {
    possible_moves.right = false;
  } else if(head[1] == 0) {
    possible_moves.up = false;
  } else if(head[1] == h-1) {
    possible_moves.down = false;
  }
  return possible_moves;
}

function bodyCheck(head, body) {
  var bad_moves = [];
  for(let i = 1; i < body.length - 1; i++) {
    if(head[0] - 1 == body[i][0] && head[1] == body[i][1]) {
      // can't move left
      bad_moves.push("left");
    } else if(head[0] + 1 == body[i][0] && head[1] == body[i][1]) {
      // can't move right
      bad_moves.push("right");
    } else if(head[1] - 1 == body[i][1] && head[0] == body[i][0]) {
      // can't move down
      bad_moves.push("down");
    } else if(head[1] + 1 == body[i][1] && head[0] == body[i][0]) {
      // can't move up
      bad_moves.push("up");
    }
  }
  return bad_moves;
}

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move
  var my_id = req.you;
  var me = getMySnake(req.snakes, my_id);
  var head = me.coords[0];

  var poss_moves = wallCheck(head, width, height);
  var bad_moves = bodyCheck(head, me.coords);
  for(bm in bad_moves) {
    possible_moves[bm] = false;
  }

  var my_move = "";
  if(poss_moves.right == true) {
    my_move = "right";
  } else if(poss_move.left == true) {
    my_move = "left";
  } else if(poss_move.up == true) {
    my_move = "up";
  } else if(poss_move.down == true) {
    my_move = "down";
  }

  // Response data
  var data = {
    move: my_move, // one of: ['up','down','left','right']
    taunt: 'I\'ll drench you!', // optional, but encouraged!
  }

  return res.json(data)
})

module.exports = router
