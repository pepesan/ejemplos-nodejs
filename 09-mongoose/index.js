var express = require('express');
var http = require('http');
//var path = require('path');
var app = express();
//var fs = require('fs') ;
var User = require('./models/user') ;
var Padre = require('./models/padres') ;
var Person = require('./models/person') ;
var Story = require('./models/story') ;


// database connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true, useUnifiedTopology: true });

// some environment variables
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();
// parse application/json
app.use(bodyParser.json());

app.get("/person",function(req,res){

  const author = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming',
  age: 50
});

author.save(function (err) {
  if (err) return handleError(err);

  const story1 = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  });

  story1.save(function (err) {
    if (err) return handleError(err);
    console.log('Author saved successfully!');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({author: author, story: story1}));
    res.end();
  });
  });
});

app.get('/show', function(req, res) {
  Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({story: story, name: story.author.name}));
    res.end();
  });
});

app.get("/demo",function(req,res){

  const parent = new Padre({ children: [{ name: 'Matt' }, { name: 'Sarah' }] })
  parent.children[0].name = 'Matthew';

  // `parent.children[0].save()` is a no-op, it triggers middleware but
  // does **not** actually save the subdocument. You need to save the parent
  // doc.
  parent.save(function(err) {
    if (err) throw err;

    console.log('Padre saved successfully!');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(parent));
    res.end();
  });

});

app.get('/import', function(req, res) {
    // create a new user called chris
    var chris = new User({
        name: 'Chris',
        username: 'sevilayha',
        password: 'password',
        email:"p@p.com"
    });
    // call the built-in save method to save to the database
    chris.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully!');
    });
    // create a new user
    var newUser = User({
        name: 'Peter Quill',
        username: 'starlord55',
        password: 'password',
        email:"p@p.com",
        admin: true
    });

    // save the user
    newUser.save(function(err) {
      if (err) throw err;

      console.log('User created!');
    });
});
app.get('/', function(req, res) {
    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(users));
        res.end();
    });
});
app.post("/",function(req,res){
    var usuario = new User(req.body);
    // call the built-in save method to save to the database
    usuario.save(function(err) {
      if (err) throw err;

      console.log('User saved successfully!');
    });
    res.end(usuario.toString());
});
app.get("/:id",function(req,res){
    var id=req.params.id;
    //console.log(id);
    User.findById(id,function(err,user){
        if (err) throw err;
        // show the one user
        console.log(user);
        res.end(user.toString());
    });

});
app.post("/:id",function(req,res){
    var id=req.params.id;
    //console.log(id);
    User.findById(id,function(err,user){
        if (err) throw err;
        // show the one user
        var usuario = new User(req.body);
        user.name=usuario.name;
        user.username=usuario.username;
        user.password=usuario.password;
        user.email=usuario.email;
        user.save(function(err) {
            if (err) throw err;

            console.log('User updated successfully!');
            res.end(user.toString());
        });
        console.log(user);

    });

});
app.delete("/:id",function(req,res){
    var id=req.params.id;
    //console.log(id);
    User.findById(id,function(err,user){
        if (err) throw err;
        // show the one user

        user.remove(function(err) {
            if (err) throw err;

            console.log('User deleted successfully!');
            res.end(user.toString());
        });
        console.log(user);

    });

});


// dynamically include routes (Controller)
/*
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});
*/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
