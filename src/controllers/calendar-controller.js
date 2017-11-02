'use strict';

const repository = require('../repositories/calendar-repository');
const guid = require('guid');
const moment = require('moment');
const momenttz = require('moment-timezone');

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

exports.getAvailableDates = async(req, res, nex) => {
    try {
        let data = await repository.getAvailableDates();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });

    }
};

exports.post = async(req, res, next) => {

    try {
        await repository.create({
            date: req.body.date,
            available: req.body.available
        });
        res.status(201).send({
            message: 'Calendário cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Calendário atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });

    }
}