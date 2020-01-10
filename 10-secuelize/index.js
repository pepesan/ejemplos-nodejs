var Sequelize = require('sequelize');

var sequelize = new Sequelize('test', 'root', 'root');

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
  pass: Sequelize.STRING
});

sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
    pass: '12345'
  });
}).then(function(jane) {
  console.log("datos de jane:"+JSON.stringify(jane.get({
    plain: true
  })));
});

sequelize.sync().then(
    function () {
      User.findAll().then(function (data) {
          console.log("FindAll:"+JSON.stringify(data));
      });
    }
);

sequelize.sync().then(
    function () {
        User.findOne({username:'janedoe'}).then(function (data) {
            console.log("FindByUsername:"+JSON.stringify(data));
        });
    }
);

sequelize.sync().then(
    function () {
        User.update({username:'jane'},{where: { username: 'janedoe' } })
            .then(function (data) {
                console.log("FindOne:"+JSON.stringify(data));
            });
    }
);

sequelize.sync().then(
    function () {
        User.destroy({where: { username: 'janedoe' } })
            .then(function (data) {
                console.log("Delete:"+JSON.stringify(data));
            });
    }
);
