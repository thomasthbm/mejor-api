'use strict';

const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');
const moment = require('moment');

exports.get = async() => {
    const res = await Schedule
        .find({})
        .populate('user', 'email name')
        .populate('calendar', 'date');

    return res;
};

exports.getScheduledDates = async(user) => {
    const res = await Schedule
        .find({ user: user })
}


exports.create = async(data) => {
    let schedule = new Schedule(data);
    await schedule.save();
};

exports.delete = async() => {
    await Schedule
        .find({ expiration: { $lt: moment(Date.now()) } }).exec(function(err, schedules) {
            //console.log(schedules);
            schedules.forEach(function(s) {
                s.remove();
            })
        });
}