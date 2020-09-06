const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
var cors = require('cors');

// our localhost port
const port = 4001
const router = express.Router();
const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)
// this is our MongoDB database
const dbRoute =
  'mongodb+srv://5xCl4aayxNprGQNn:<password>@cluster0.0muup.mongodb.net/<dbname>?retryWrites=true&w=majority';
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);
module.exports = router ;

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('message', (message) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('message: ', message)
    io.sockets.emit('message', message)
  })

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
