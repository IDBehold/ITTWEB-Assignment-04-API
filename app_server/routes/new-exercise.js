const express = require('express');
const router = express.Router();
const controller = require('../controllers/new-exercise');

router.get('/', controller.newExercise);
router.post('/', controller.createExercise);

module.exports = router;
