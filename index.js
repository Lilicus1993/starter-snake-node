const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const app = express()
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game

  // Response data
  const data = {
    color: '#AD56FF',
    headType: "bendr",
    tailType: "small-rattle"
  }

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move
  var arrMove = ["up", "down", "left", "right"];
  var direction = 3;
 // console.log(request);
  console.log("This is x " + request.body.you.body[0].x);
  console.log("This is y " + request.body.you.body[0].y);

 // if (direction == 3) {
   //num = Math.floor(Math.random() * Math.floor(3));
 //   direction += 1;
  //} else if (turnCount == 6) {
//    direction = 3;
//  } else {
//    direction = 0;
 // }
  var turn = arrMove[direction];
  //console.log(arrMove[3]);

  // Response data
  const data = {
    move: turn,
  
  }
   // move: 'up', // one of: ['up','down','left','right']

  return response.json(data)
})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({})
})

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  return response.json({});
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
