const express = require('express');
const router = express.Router();
const controller = require('../controllers/new-workout');

router.get('/', controller.newWorkout);
router.post('/', controller.create);

module.exports = router;