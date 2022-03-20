const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,

} = require('../../controllers/user-controllers');
 
// /api/users
router.route('/:userId')

// /api/users/:UserId
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser);
router.route('/:userId').get(getSingleUser).put(updateUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/students/:UserId/friends/:friendsId
router.route('/:UserId/friends/:friendsId');
router.route('/:UserId/friends').post(addFriend);
router.route('/:UserId/thoughts/:friendsId').delete(removeFriend);

module.exports = router;