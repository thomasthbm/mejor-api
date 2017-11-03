'use strict';

const schedule = require('node-schedule');
const schedules = require('../services/schedules/schedules');
const users = require('../controllers/user-controller');
const _schedules = require('../controllers/schedule-controller')
const log4js = require('log4js');
const log = log4js.getLogger('cron');

module.exports = function() {
    let rule_deleteExpiredUsers = new schedule.RecurrenceRule();
    rule_deleteExpiredUsers.name = 'Schedule in User Controller - Delete Expired Users';
    rule_deleteExpiredUsers.hour = 19;
    rule_deleteExpiredUsers.minute = 2;

    log.info('Delete Expired Users at ' + rule_deleteExpiredUsers.hour + ':' + rule_deleteExpiredUsers.minute + '.');
    schedules.runner(rule_deleteExpiredUsers, users.deleteExpiredUsers);

};