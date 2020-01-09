
exports.mandaCookies=function (req,res){
        //Manda una cookie
        var fecha_expiracion=new Date(2028, 2, 28);
        res.cookie("Clave3","Valor",
            {
                domain:"localhost",
                path:"/",
                expires:fecha_expiracion
            });
        console.log("cookie mandada");
        res.send("cookie mandada!");
    };

exports.imprimeCookies=function (req,res){
    //Array de cookies
    if(req.cookies!=undefined){
        console.log(req.cookies);      
        res.send(req.cookies);
    }else{
        res.send("No has mandado cookies");
    }
   
};
