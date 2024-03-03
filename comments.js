// create new web server
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

// use body parser to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// get all comments
app.get('/api/comments', function(req, res) {
  fs.readFile('./comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// add a comment
app.post('/api/comments', function(req, res) {
  // read the comments file
  fs.readFile('./comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      // parse the JSON data
      var comments = JSON.parse(data);
      // add the new comment to the array
      comments.push(req.body);
      // write the comments back to the file
      fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

// start the server
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
