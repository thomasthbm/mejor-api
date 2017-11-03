'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user-repository');
const scheduleRespository = require('../repositories/schedule-repository');
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

exports.getByEmail = async(req, res, next) => {
    try {
        let data = await repository.getByEmail(req.params.email);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });

    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.name, 5, 'O Nome deve ter pelo menos 5 caractéres.');
    contract.hasMaxLen(req.body.name, 160, 'O Nome deve ter no máximo 160 caractéres.');
    contract.hasMinLen(req.body.localization, 5, 'A Localização deve ter pelo menos 5 caractéres.');
    contract.hasMaxLen(req.body.localization, 160, 'A Localização deve ter no máximo 160 caractéres.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {

        let createDate = moment(Date.now());
        let expirationDate = moment(createDate).add(3, 'day');

        let user = await repository.create({
            email: req.body.email,
            name: req.body.name,
            birthDate: req.body.birthDate,
            localization: req.body.localization,
            height: req.body.height,
            weight: req.body.weight,
            created: createDate,
            expiration: expirationDate
        });
        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!',
            user: user
        });
    } catch (e) {
        res.status(500).send([{
            message: 'Falha ao processar sua requisição'
        }]);
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete();
        res.status(201).send({
            message: 'Usuário excluido com sucesso!'
        });

    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

}

exports.deleteExpiredUsers = function() {

    repository.delete();
    scheduleRespository.delete();

}