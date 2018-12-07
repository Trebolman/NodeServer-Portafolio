'use strict';
var Project = require("../models/project");

// agregamos la libreria para copiar, pegar archivos
var fs = require('fs');

// sirve para solucion de rutas
var path_module = require('path');

// crearemos con su controlador
var controller = {
    home: function(req,res){
        return res.status(200).send({
            message: "Home del controlador",
        });
    },

    // Create
    createProject: function(req,res) {
        // creando objeto del modelo project administrado por Mongoose
        var objProject = new Project(); 
        // creo un objeto que reciba parametros de POSTMAN
        var params = req.body;
        objProject.name = params.name;
        objProject.description = params.description;
        // objProject.cate
        objProject.category = params.category;
        objProject.langs = params.langs;
        objProject.year = params.year;
        objProject.image = "vacio";

        // return res.status(200).send({
        //     project: objProject
        // });

        objProject.save((err, proyectGuardado)=>{
            if(err){
                return res.status(500).send({error: "Error 500"});
            }
            if(!proyectGuardado){
                return res.status(404).send({error: "Error 404"});
            }
            return res.status(200).send({creado:proyectGuardado});
        }) //me devuelve un callback
    },

    // Read
    getProjectById: function(req,res){ // devolverá un proyecto segun el ID que envie
        var id = req.params.id;
        // 
        Project.findById(id,(err,proyectoRecibido)=>{
            if(err){
                return res.status(500).send({error: "Error 500: Error al traer el proyecto"});
            }
            if(!proyectoRecibido){
                return res.status(404).send({error: "Error 404: El proyecto no existe"});
            }
            return res.status(200).send({found: proyectoRecibido});
        })
    },

    getProjectAll: function(req,res){ // devolverá un proyecto segun el ID que envie
        // var id = req.params.id;

        // // Ordenar de mayor a menor 
        // Project.find().sort('2018').exec((err, proyectos)=>{
        
        // // Ordenar de menor a mayor
        // Project.find().sort('-2018').exec((err, proyectos)=>{
        
        // // creacion de un filtro: Que muestre los que se crearon en el 2017
        // Project.find({year:2017}).exec((err, proyectos)=>{
            
        Project.find().exec((err, proyectos)=>{
            if(err){
                return res.status(500).send({error: "Error 500: Error al devolver los proyectos"});
            }
            if(!proyectos){
                return res.status(404).send({error: "Error 404: Los proyectos no existen"});
            }
            return res.status(200).send({projects: proyectos});
        });
    },

    // Update
    // Algo que nunca se puede hacer es actualizar el ID. El unico dato que se deberia tener de un cliente es su ID
    updateProjectById: function(req,res){
        var nuevosParametros = req.body;
        // console.log(nuevosParametros);
        var projectid = req.params.id;
        Project.findByIdAndUpdate(projectid,nuevosParametros,{new:true},(err,objProjectUpdated)=>{
            if(err){
                return res.status(500).send({Error:"Error al actualizar el proyecto"});
            }
            if(!objProjectUpdated){
                return res.status(404).send({Error:"No existe el proyecto para actualizar"});
            }
            return res.status(200).send({Actualizado: objProjectUpdated});
        });
        console.log(projectid);
    },

    // Delete
    // Eliminar es recomendable usar el findOne. Usar metodos deprecated
    deleteProyectById: function(req,res){
        var projectid = req.params.id;
        // Recibir tambien confirmacion de eliminacion
        Project.findByIdAndRemove(projectid,(err,objProjectDeleted)=>{
            if(err){
                return res.status(500).send({Error:"Error al eliminar el proyecto"});
            }
            if(!objProjectDeleted){
                return res.status(404).send({Error:"No existe el proyectoa a eliminar"});
            }
            return res.status(200).send({eliminado: objProjectDeleted});
        });
    },

    // ----------------------------------------
    uploadImageById: function(req,res){
        var projectId = req.params.id;
        // images/dsfsdfdsfsd.jpg
        if(req.files){
            // ruta de archivo
            var filePath = req.files.image.path;
            console.log(filePath);
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];
            if(fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "jpeg"){
                Project.findByIdAndUpdate(projectId,{image: fileName},{new:true},(err,objProjectUpdated)=>{
                    if(err){
                        return res.status(500).send({Error:"Error al subir la imagen"});
                    }
                    if(!objProjectUpdated){
                        return res.status(404).send({Error:"El proyecto no existe"});
                    }
                    return res.status(200).send({project: objProjectUpdated});
                });
            }
            else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:"La extension del archivo es invalida"});
                }); //elimina la imagen cargada, cuando se produce un error
            }
        }
        else{
            return res.status(200).send({message:"Archivo no seleccionado"});
        }
    },

    getImageByName: function(req,res){
        var nombre_archivo = req.params.namefile; // en el que file hace de id
        var path = './images/'+nombre_archivo;
        fs.exists(path,(exist)=>{
            if(exist){
                return res.sendFile(path_module.resolve(path)); //SendFile es una funcion propia
            }
            else{
                return res.status(200).send({Error:"La imagen no existe"});
            }
        });
    }
};

module.exports = controller;