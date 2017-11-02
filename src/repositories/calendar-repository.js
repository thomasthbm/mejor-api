'use strict';

const mongoose = require('mongoose');
const Calendar = mongoose.model('Calendar');
const moment = require('moment');

exports.get = async() => {
    const res = await Calendar
        .find({});
    return res;
};

exports.getAvailableDates = async() => {
    let obj = [];

    const res = await Calendar
        .find({ available: true }, 'date');

    res.forEach(function(item) {
        obj.push({
            _id: item._id,
            date: moment(item.date).format('DD/MM/YYYY HH:mm')
        })
    });

    return obj;
};


exports.create = async(data) => {
    console.log(data);
    let calendar = new Calendar(data);
    await calendar.save();
};

exports.update = async(id, data) => {
    await Calendar
        .findByIdAndUpdate(id, {
            $set: {
                available: false
            }
        });
}