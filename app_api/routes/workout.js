const express = require('express');
const router = express.Router();
const ctrlIndex = require('../controllers/workout');

router.get('/', ctrlIndex.getAll);
router.get('/:id', ctrlIndex.getId);
router.post('/workout', ctrlIndex.createWorkout);
router.post('/exercise', ctrlIndex.createExercise);
router.put('/countUp/:id', ctrlIndex.countUp);
router.delete('/:id', ctrlIndex.delete);


module.exports = router;
