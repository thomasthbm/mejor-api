'use strict';

const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');

exports.get = async() => {
    const res = await Schedule
        .find({})
        .populate('user', 'email name')
        .populate('calendar', 'date');

    return res;
};


exports.create = async(data) => {
    let schedule = new Schedule(data);
    await schedule.save();
};