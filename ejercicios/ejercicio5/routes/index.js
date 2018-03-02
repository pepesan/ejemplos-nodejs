var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get("/pagina",function(req,res){
   res.render("pagina",
        {
            title:"Mi título",
            otra_variable:"Otro valor"
        }
    ); 
});

router.get('/formulario', function(req, res) {
  res.render('formulario', { title: 'Login' });
});


module.exports = router;
