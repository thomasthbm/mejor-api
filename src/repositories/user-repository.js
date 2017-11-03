'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const moment = require('moment');

exports.get = async() => {
    const res = await User
        .find({});

    return res;
}

exports.getByEmail = async(email) => {
    const res = await User
        .findOne({
            email: email
        });

    if (!res)
        return {}

    return res;
}

exports.create = async(data) => {
    let user = new User(data);
    await user.save();
    return user._id;
}

exports.delete = async() => {
    await User
        .find({ expiration: { $lt: moment(Date.now()) } }).exec(function(err, users) {
            users.forEach(function(u) {
                u.remove();
            })
        });
}