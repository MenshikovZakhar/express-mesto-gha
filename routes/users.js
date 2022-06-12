const router = require('express').Router();

const {
  getUser, getUsers, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;