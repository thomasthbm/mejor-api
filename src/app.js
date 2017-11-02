'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();
const router = express.Router();

//Conecta ao Banco de Dados
mongoose.connect(config.connectionString);

//Carrega os models
const Agenda = require('./models/Schedule');
const Paciente = require('./models/User');
const Calendario = require('./models/Calendar');

//carrega as rotas
const indexRoute = require('./routes/index-route');
const scheduleRoute = require('./routes/schedule-route');
const userRoute = require('./routes/user-route');
const calendarRoute = require('./routes/calendar-route');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/schedule', scheduleRoute);
app.use('/user', userRoute);
app.use('/calendar', calendarRoute);

module.exports = app;