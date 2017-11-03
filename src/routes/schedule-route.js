'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/schedule-controller');

router.get('/', controller.get);
router.get('/:user', controller.getScheduledDates);
router.post('/', controller.post);

module.exports = router;