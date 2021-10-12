const { Router } = require('express');
const router = Router();
const passport = require('passport');
const courseController = require('../controllers/courseController');

router.get('/', courseController.allCourse );
router.get('/:id',passport.authenticate('jwt', { session:false }), courseController.courseById);
router.get('/:id/progress', passport.authenticate('jwt', { session:false }), courseController.courseProgress);
router.post('/:id/markcompleted', passport.authenticate('jwt', { session:false }), courseController.markCompleted);
router.get('/subtopics/:id', passport.authenticate('jwt', { session:false }), courseController.subTopics);

module.exports = router;
