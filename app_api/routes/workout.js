const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
const express = require('express');
const router = express.Router();
const ctrlIndex = require('../controllers/workout');
const ctrlAuth = require('../controllers/authentication');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/', ctrlIndex.getAll);
router.get('/:id', ctrlIndex.getId);
router.post('/workout', auth, ctrlIndex.createWorkout);
router.post('/exercise', auth, ctrlIndex.createExercise);
router.put('/countUp/:id', auth, ctrlIndex.countUp);
router.delete('/:id', auth, ctrlIndex.delete);


module.exports = router;
