'use strict';
var express = require('express');
var ProjectController = require('../controllers/project');
var router = express.Router(); //enrutador

// Cramos import del objeto multipart
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './images'}); //Estamos configurando el directorio en el que nuestras imagenes se guardan

router.get('/home',ProjectController.home);
router.post('/createProject',ProjectController.createProject);
router.get('/project/:id',ProjectController.getProjectById);
router.get('/projects',ProjectController.getProjectAll);
router.put('/updateProjectById/:id',ProjectController.updateProjectById);
router.delete('/deleteProyectById/:id',ProjectController.deleteProyectById);
router.post('/uploadImageById/:id',multipartMiddleware,ProjectController.uploadImageById); //usamos un middlewar que hace de observador, validador
router.get('/get-image/:namefile',ProjectController.getImageByName);

module.exports = router;