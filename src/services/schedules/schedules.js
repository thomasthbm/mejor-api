'use strict';

const schedule = require('node-schedule');
const log4js = require('log4js');
const log = log4js.getLogger('schedules');

exports.runner = function(rules, param) {
    let j = schedule.scheduleJob(rules, param);
    if (j) log.info(rules.name + ' has been started');
    else log.fatal(rules.name + ' hasn\'t been started');
};