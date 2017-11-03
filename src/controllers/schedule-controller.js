'use strict';

const repository = require('../repositories/schedule-repository');
const calendarRepository = require('../repositories/calendar-repository');
const guid = require('guid');
const moment = require('moment');

exports.get = async(req, res, nex) => {

    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });

    }
};

exports.getScheduledDates = async(req, res, nex) => {

    try {
        let data = await repository.getScheduledDates(req.params.user);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });

    }
};

exports.post = async(req, res, next) => {

    try {
        let createDate = moment(Date.now());
        let expirationDate = moment(createDate).add(3, 'day');

        await repository.create({
            user: req.body.user,
            calendar: req.body.calendar,
            created: createDate,
            expiration: expirationDate
        });

        await calendarRepository.update(req.body.calendar, {});

        res.status(201).send({
            message: 'Agenda cadastrada com sucesso!'
        });

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.deleteExpiredSchedules = function() {
    console.log('Iniciando exclusão de agendas');

    repository.delete();

    console.log('Exclusão de agendas finaliazada');

}