// archivo de partida
'use strict';

// importamos
var mongoose = require('mongoose');

// Nos conectamos
var app = require('./app'); //importo un objeto express
var puerto = 3700;
mongoose.Promise = global.Promise; //global pertenece al kernel de NodeJS

// Creacion de rutas a traves de express
mongoose.connect('mongodb://localhost:27017/portafolio')
.then(()=>{
    console.log("Conexion a la base de datos exitosa");
    app.listen(puerto,()=>{ // listen es propio de express
        console.log("Servidor corriendo perfectamente => localhost:3700");
    }); // escuchador
}).catch(error=>{
    console.log(error);
});

// importamos