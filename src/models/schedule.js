'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    calendar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Calendar'
    }

});

module.exports = mongoose.model('Schedule', schema);