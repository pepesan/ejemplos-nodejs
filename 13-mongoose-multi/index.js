var express = require('express');
var http = require('http');
//var path = require('path');
var app = express();
//var fs = require('fs') ;
var User = require('./models/user') ;
var Project = require('./models/project') ;
var Image = require('./models/image') ;


// database connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

// some environment variables
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var bodyParser = require('body-parser');
// create application/json parser 
var jsonParser = bodyParser.json();
// parse application/json 
app.use(bodyParser.json());

app.get('/', function(req, res) {
    // get all the users
    Project.find()
        .populate('images')
        .exec(function (err, post) {
            if (err) return handleError(err);
            console.log(post);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(post));
            res.end();
        });
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});