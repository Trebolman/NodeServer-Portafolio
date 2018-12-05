// DEfinimoS Nuestro modelo
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var projectSchema = schema({ //no importa si usas con mayuscula o minuscula al comienzo
    name:String,
    descripcion:String,
    category:String,
    langs:String,
    year:Number,
    image:String
});

// hacemos que el modelo sea exportable
module.exports = mongoose.model('project', projectSchema);

// mongoose cambiar automaticamente project => projects en la base de datos en MongoDB.