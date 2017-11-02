'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/calendar-controller');

router.get('/', controller.get);
router.get('/available', controller.getAvailableDates);
router.post('/', controller.post);
router.put('/:id', controller.put);

module.exports = router;