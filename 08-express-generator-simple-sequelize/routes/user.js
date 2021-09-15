var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

var sequelize = new Sequelize('test', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
});

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
  pass: Sequelize.STRING
});

router.get('/',  function(req, res, next) {
  console.log('/user');
   sequelize.sync().then(
      function () {
        console.log('sync');
        User.findAll().then(function (data) {
            console.log("FindAll:"+JSON.stringify(data));
            res.setHeader('Content-Type', 'application/json');
            res.send( JSON.stringify(data));
            res.end();
        });
      }
  );
});
router.post('/',function(req, res, next) {
  console.log('/user');
   sequelize.sync().then(
      function () {
        User.create({
          username: req.body.username,
          //birthday: new Date(1980, 6, 20),
          pass: req.body.pass
        }).then(function (data) {
            console.log("Create:"+JSON.stringify(data));
            res.setHeader('Content-Type', 'application/json');
            res.send( JSON.stringify(data));
            res.end();
        });
      }
  );
});

router.get('/:id',  function(req, res, next) {
  console.log('/user/:id');
  const iden = req.params.id;
   sequelize.sync().then(
      function () {
        console.log('sync');
        User.findAll({
          where: {
            id: iden
          }
        }).then(function (data){
          console.log("FindAllById:"+JSON.stringify(data));
          res.setHeader('Content-Type', 'application/json');
          res.send( JSON.stringify(data[0]));
          res.end();
        });
      }
  );
});
router.post('/:id',  function(req, res, next) {
  console.log('/user/:id');
  const iden = req.params.id;
   sequelize.sync().then(
      function () {
        console.log('sync');
        User.update({ // datos a modificar
          username: req.body.username,
          birthday: req.body.birthday,
          pass: req.body.pass
        },
        { // condición a aplicar
          where: {
            id: iden
          }
        }).then(function (data){
          User.findAll({
            where: {
              id: iden
            }
          }).then(function (data){
            console.log("FindAllById:"+JSON.stringify(data));
            res.setHeader('Content-Type', 'application/json');
            res.send( JSON.stringify(data[0]));
            res.end();
          });
        });
      }
  );
});

router.delete('/:id',  function(req, res, next) {
  console.log('/user/:id');
  const iden = req.params.id;
   sequelize.sync().then(
      function () {
        console.log('sync');
        User.findAll({
          where: {
            id: iden
          }
        }).then(function (data){
          User.destroy({
            where: {
              id: iden
            }
          }).then(function (data2){
            console.log("FindAllById:"+JSON.stringify(data));
            res.setHeader('Content-Type', 'application/json');
            res.send( JSON.stringify(data));
            res.end();
          });
        });

      }
  );
});

module.exports = router;
