const express = require('express');
const ongController = require('./controllers/ongController'); 
const incidentController = require('./controllers/incidentController'); 
const profileController = require('./controllers/profileController.js');
const sessionController = require('./controllers/sessioncontroller.js');

const rotas = express.Router();

rotas.get('/ongs', ongController.lista);
rotas.post('/ongs', ongController.insere);
rotas.get('/incidents', incidentController.lista);
rotas.post('/incidents', incidentController.insere);
rotas.delete('/incidents/:incident_id', incidentController.deleta);
rotas.get('/profile',profileController.lista);

rotas.post('/login', sessionController.login);



 module.exports = rotas;