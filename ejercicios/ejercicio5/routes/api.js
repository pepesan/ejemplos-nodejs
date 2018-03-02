var express = require('express');
var router = express.Router();

/* GET API AJAX. */
router.get('/', function(req, res, next) {
    var objetoJSON={
        propiedad:"valor"
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(objetoJSON));
});

router.get("/libros",function(req,res){
    var libros=[
        {
            titulo:"1984",
            author:"George Orwell"
        },{
            titulo:"Manolito gafotas",
            author:"Elvira Lindo"
        }
    ];
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(libros));
});

router.post("/login",function(req,res){
    var user=req.body;
    var resultado={
        //result:null
    };
    if(user.usuario=="admin" && user.password=="admin"){
        //Devolver result:true
        resultado.result=true;
    }else{
        //Devolver result:false
        resultado.result=false;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(resultado));
});

module.exports = router;


/*

*/