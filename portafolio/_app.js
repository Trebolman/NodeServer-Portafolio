'use strict';
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos de rutas (independitnest()

//middlewares



//CORS

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods','GET','POST','OPTIONS','PUT','DELETE');
//     res.header('Allow','GET','POST','OPTIONS','PUT','DELETE');
//     next();
// });
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
//  });

//  app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.json({data: [1,2,3,4]})
//   });
var rutas_de_project = require('./routes/project');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Cargando archivo de rutas



//rutas de prueba (creadas de forma artesanal)
//req => request que nos hace la pagina solicitante de la api
//res => respuesta o response que devolvemos a la pagina solicitante

// app.get('/',(req,res)=>{
//    res.status(200).send("<h1>Página de inicio de Node =) <3 (`)> </h1>");
// });
// app.post('/',(req,res)=>{
//    res.status(200).send("<h1>Página de inicio de Node POST</h1>");
// });
// app.get('/test',(req,res)=>{
//    res.status(200).send("<h1>TEST ';..;'</h1>");
//    console.log("BUENAS TARDES BATERIA");
//    console.log(req.body.nombre);
//    console.log(req.query.parametro1);
// });
// app.get('/otrotest/:id',(req,res)=>{
//    res.status(200).send({
//       "message":"La pagina funciona correctamente",
//       "status":200
//    });
//    console.log(req.params.id);
// });

app.use('/API',rutas_de_project);
module.exports = app;