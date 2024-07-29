const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.register);
router.get('/:id', UserController.getUser);

module.exports = router;
