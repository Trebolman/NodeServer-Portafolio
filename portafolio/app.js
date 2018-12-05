// configuracion inicial y express de nuestro servidor web
'use strict';

// importamos express
var express = require('express');
var bodyParser = require('body-parser');

// inicializando un objeto express
var app = express();

// **** cargaremos archivos independientes de rutas

// **** middlewares
// todo lo que nos llegue lo convertirá en json (url, contenido, request)
// Es un script que se encuentra en el medio para validar entradas
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// **** cors
// configuraremos para que no haya mas restricciones del cors
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers    ','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET','POST','OPTIONS','PUT','DELETE');
    res.header('Allow','GET','POST','OPTIONS','PUT','DELETE');
    next();
});

// cargado archivo de rutas
var rutas_de_project = require('./routes/project');

// **** rutas de prueba (creadas de forma artesanal en realidad no deberían ir aquí)
// req: request que nos hace la pragina solicitante de la api
// res: respuesta o response que devolvems a la pagina solicitante
app.get('/',(req,res)=>{ // ruta por defecto
    res.status(200).send("<h1>Pagina de inicio de Node</h1>") // if status = 200, entonces la respuesta se ha dado
}); 

//ruta con el verbo post
// app.post('/',(req,res)=>{ // ruta por defecto
//     res.status(200).send("<h1>Pagina de prueba metodo POST</h1>") // if status = 200, entonces la respuesta se ha dado
// }); 

// app.get('/test',(req,res)=>{ // ruta /test
//     res.status(200).send("<h1>Pagina test </h1>") // if status = 200, entonces la respuesta se ha dado
//     console.log("Hola nariz de bola");
//     console.log(req.body.nombre); //url codificado
//     console.log(req.query.parametro1); //url normal
// }); 

// app.get('/otrotest/:id',(req,res)=>{
//     res.status(200).send({
//         "message":  "La pagina funciona correctamente",
//         "status":   200
//     }); //devolvemos json
//     console.log(req.params.id); // ahora nuestra ruta sera localhost:3700/otrotest/23 (valor de frente) y se guarda en la variabla id
// });

// app.post('/otrotest/:id',(req,res)=>{
//     res.status(200).send({
//         "message":  "La pagina funciona correctamente POST",
//         "status":   200
//     }); //devolvemos json
//     console.log(req.params.id); // ahora nuestra ruta sera localhost:3700/otrotest/23 (valor de frente) y se guarda en la variabla id
// });

// le digo al app que use las rutas
app.use('/API/',rutas_de_project); //coleccion de rutas 

// arreglo de objetos que se exportarán
module.exports = app; // arreglo global que indica los objetos que son exportables