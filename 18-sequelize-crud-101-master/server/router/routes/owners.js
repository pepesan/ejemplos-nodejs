'use strict';

module.exports = (app, db) => {

  // GET all owners
  app.get('/owners', (req, res) => {
    db.owners.findAll()
      .then(owners => {
        res.json(owners);
      });
  });

  // GET one owner by id
  app.get('/owners/:id', (req, res) => {
    const id = req.params.id;
    db.owners.findAll({
      where: { id: id}
    })
      .then(owner => {
        res.json(owner[0]);
      });
  });

  // POST single owner
  app.post('/owners', (req, res) => {
    const name = req.body.name;
    const role = req.body.role;
    db.owners.create({
      name: name,
      role: role,
      created_at: new Date() // he tenido que meter la fecha
    })
      .then(newOwner => {
        //delete newOwner.created_at;

        res.json(newOwner);
      })
  });

  // PATCH single owner
  app.put('/owners/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    db.owners.update({ // datos a modificar
        name: req.body.name,
      //  role: req.body.role
      },
      { // condición a aplicar
        where: {
          id: id
      }
    }).then(function (data){
      db.owners.findAll({
        where: { id: id }
      }).then(function (owners) {
        res.json(owners[0]);
      })
    });
  });

  // DELETE single owner
  app.delete('/owners/:id', (req, res) => {
    const id = req.params.id;
    db.owners.destroy({
      where: { id: id }
    })
      .then(deletedOwner => {
        res.json(deletedOwner);
      });
  });
};
