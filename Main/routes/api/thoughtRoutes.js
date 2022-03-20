const router = require('express').Router();

const { createThought, deleteThought, getSingleThought } = require('../../controllers/thought-controllers');
const {
    getThought,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,

} = require('../../controllers/thought-controllers');
 
// /api/thougts
router.route('/').get(getThought).post(createThought);

// /api/courses/:courseId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
