// server.js
// load the things we need
let express = require('express');
let app = express();
let path = require("path");
let bodyParser = require("body-parser");
const fs = require('fs');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    extended: true
}));

// enable reading json from post requests 
app.use(express.json({
  type: ['application/json', 'text/plain']
}))


app.get('/', function(req, res) {	
  res.render('index');  
});

app.post('/loginCheck', function (req, res) {
  
  uName = req.body.userName;
  uPassword = req.body.password;
  console.log(uName + "  " + uPassword);
  let answer = getType(uName, uPassword);
  if (checkUser(uName, uPassword)) {      
      res.writeHead(200);
      res.end(answer); // without body 
  }
  else {
      res.writeHead(401);
      res.end();
  }  
});

function checkUser(uName, uPassword) {
  let db = require('./public/users.json')
  let found = false
  Object.keys(db.Users).forEach(function (userType) {
      Object.keys(db.Users[userType]).forEach(function (userIndex) {
          user = db.Users[userType][userIndex]
          if (user.active == "Yes")			  
              if (user.userName == uName && user.password == uPassword) {                  
                  found = true;
              }
      });
  });
  return found;
}

// POST method for check the user type
app.post('/getType', function (req, res) {
  let uName = req.body.userName;
  let uPassword = req.body.password;
  let answer = getType(uName, uPassword);
   if (answer != null) {  
	  console.log(answer);  
      res.writeHead(200);
      res.end(); // without body 
  }
  else {
      res.writeHead(401);
      res.end();
  }  
});


function getType(uName, uPassword) {
  let db = require('./public/users.json')
  let uType = "user not found!"
  console.log(uName + " " + uPassword);
  Object.keys(db.Users).forEach(function (userType) {
      Object.keys(db.Users[userType]).forEach(function (userIndex) {
          user = db.Users[userType][userIndex]
            if (user.userName == uName && user.password == uPassword) {
                uType = userType; 
            }
      });
  });

  return uType;
}

app.get('/getdb', function (req, res) {
    let db = require('./public/users.json')
    res.json(db)
});

// POST method for updating a user
app.post('/updateUser', function (req, res) {

    setTimeout(afterTO, 1000); //  1 sec delay

    let db = require('./public/users.json')
    let chosenType = req.body.type;
    let chosenName = req.body.name;
    let chosenFeature = req.body.feature
    let updatedValue = req.body.newValue

    function afterTO() {
        Object.keys(db.Users[chosenType]).forEach(function (userIndex) {
            let user = db.Users[chosenType][userIndex]
            if (user.name == chosenName) {
                db.Users[chosenType][userIndex][chosenFeature] = updatedValue;

                // update the original database
                var outputFilename = './public/users.json';
                fs.writeFile(outputFilename, JSON.stringify(db), function (err) {
                    if (err) {
                        res.writeHead(500);
                    } else {
                        res.writeHead(200);
                    }
                    res.end()
                });
            }
        })
    }
})



// POST method for adding a user
app.post('/addUser', function (req, res, next) {

    setTimeout(afterTO, 1000); // 1 sec delay

    let db = require('./public/users.json')
    let chosenType = req.body.type;
    let newUser = req.body.newUser
    db.Users[chosenType].push(newUser)

    // update the original database
    function afterTO() {
        var outputFilename = './public/users.json';
        fs.writeFile(outputFilename, JSON.stringify(db), function (err) {
            if (err) {
                res.writeHead(500);
            } else {
                res.writeHead(200);
            }
            res.end()
        });
    }
})

app.listen(8080, function () {
 console.log('Listening on port 8080!');
});