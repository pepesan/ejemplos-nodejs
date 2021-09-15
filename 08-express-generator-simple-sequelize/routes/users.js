var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'root', 'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    });
//var User = require('../models/usuario')(sequelize, DataTypes);
var User = require('../models/usuario');
/* GET users listing. */
router.get('/',  function(req, res, next) {
  sequelize.sync().then(
      function () {
        User.sync({force: true}).then(function () {
          // Table created
          return User.create({
            firstName: 'John',
            lastName: 'Hancock'
          });
        });
      }
  );

  /*
  console.log(User);
  User.findAll().then(function (users) {
    console.log("All users:",JSON.stringify(users, null, 2));
    res.setHeader('Content-Type', 'application/json');
    res.send( JSON.stringify(users, null, 2));
  });
  */

});

module.exports = router;
